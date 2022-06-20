import { CommandInteraction } from 'discord.js';
import Bot from '../Bot';
import Event from '../util/structures/Event';

export default new Event({
    name: 'interactionCreate',
    run: async (client: Bot, interaction: CommandInteraction) => {
        if (!interaction.isChatInputCommand()) return;

        const slashCommand = client.slashCommands.get(interaction.commandName);
        if (!slashCommand) return interaction.reply({ embeds: [
            client.embed({
                type: 'error',
                text: 'Oops! Command does not exist!'
            })
        ], ephemeral: true });

        if (slashCommand.category === 'splitgate' && !client.splitgate.authorized) return interaction.reply({ embeds: [
            client.embed({
                type: 'error',
                text: 'Oops! The bot owner has not logged in on Splitgate yet!'
            })
        ], ephemeral: true });

        if (slashCommand.category === 'owner' && !client.config.dev.ids.includes(interaction.user.id)) return interaction.reply({ embeds: [
            client.embed({
                type: 'error',
                text: 'Oops! You are not the bot owner!'
            })
        ], ephemeral: true });

        try {
            await slashCommand.run(client, interaction);
        } catch (error) {
            if (!interaction.replied) interaction.reply({ embeds: [
                client.embed({
                    type: 'error',
                    text: `Oops! Something went wrong!\n> ${error}`
                })
            ], ephemeral: true });    
        }
    }
});