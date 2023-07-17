import { SlashCommandRunDTO } from '../../../types/SlashCommand';
import SlashCommand from '../../../util/structures/SlashCommand';

class TestCommand extends SlashCommand {
    constructor() {
        super({
            name: 'test',
            description: 'A test command',        
        })
    }

    async run ({ interaction }: SlashCommandRunDTO) {
        interaction.reply({content: 'This is a test 🧪.', ephemeral: true });
    }
}

export default new TestCommand;
