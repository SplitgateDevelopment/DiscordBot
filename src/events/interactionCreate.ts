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

        try {
            await slashCommand.run(client, interaction);
        } catch (error) {
            interaction.reply({ embeds: [
                client.embed({
                    type: 'error',
                    text: `Oops! Something went wrong!\n> ${error}`
                })
            ], ephemeral: true });    
        }
    }
});