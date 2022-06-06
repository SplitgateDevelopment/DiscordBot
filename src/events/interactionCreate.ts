import { CommandInteraction } from 'discord.js';
import Bot from '../Bot';
import Event from '../util/structures/Event';

export default new Event({
    name: 'interactionCreate',
    run: async (client: Bot, interaction: CommandInteraction) => {
        if (!interaction.isChatInputCommand()) return;

        const slashCommand = client.slashCommands.get(interaction.commandName);
        if (!slashCommand) return interaction.reply({ content: 'Oops! Command does not exist! ❌', ephemeral: true });

        try {
            await slashCommand.run(client, interaction);
        } catch (error) {
            interaction.reply({ content: 'Oops! Something went wrong! ❌', ephemeral: true });    
        }
    }
});