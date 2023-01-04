import { CommandInteraction } from 'discord.js';
import Bot from '../../../Bot';
import SlashCommand from '../../../util/structures/SlashCommand';

class TestCommand extends SlashCommand {
    constructor() {
        super({
            name: 'test',
            description: 'A test command',        
        })
    }

    async run (client: Bot, interaction: CommandInteraction) {
        interaction.reply({content: 'This is a test 🧪.', ephemeral: true });
    }
}

export default new TestCommand;
