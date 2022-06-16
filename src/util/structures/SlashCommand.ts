import { ISlashCommand, SlashCommandOptions } from '../../types/SlashCommand';
import { ApplicationCommandOptionData, ApplicationCommandType, CommandInteraction } from 'discord.js';
import Bot from '../../Bot';

class SlashCommand implements ISlashCommand {
    name: string;
    description: string;
    options?: ApplicationCommandOptionData[] = [];
    type?: ApplicationCommandType = ApplicationCommandType.ChatInput;
    category?: string;
    run: (client: Bot, interaction: CommandInteraction) => void;
    constructor(options: SlashCommandOptions) {
        this.name = options.name;
        this.description = options.description;
        this.options = options.options || [];
        this.type = options.type || ApplicationCommandType.ChatInput;
        this.category = options.category;
        this.run = options.run;
    }
}

export default SlashCommand;