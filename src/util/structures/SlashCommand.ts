import { ISlashCommand, SlashCommandOptions, SlashCommandRunDTO } from '../../types/SlashCommand';
import { ApplicationCommandOptionData, ApplicationCommandType } from 'discord.js';

abstract class SlashCommand implements ISlashCommand {
    name: string;
    description: string;
    options: ApplicationCommandOptionData[];
    type: ApplicationCommandType = ApplicationCommandType.ChatInput;
    category?: string;
    private: boolean;
    constructor(options: SlashCommandOptions) {
        this.name = options.name.toLowerCase();
        this.description = options.description;
        this.options = options.options || [];
        this.type = options.type || ApplicationCommandType.ChatInput;
        this.category = options.category;
        this.private = options.private || false;
        if (options.run) this.run = options.run;
    }

    run (_executeDTO: SlashCommandRunDTO): void {
        throw new Error('Not implemented');
    }
}

export default SlashCommand;