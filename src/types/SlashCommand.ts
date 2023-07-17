import { ApplicationCommandOptionData, ApplicationCommandType, CommandInteraction } from 'discord.js';
import { InteractionRunDTO } from './Bot';

type SlashCommandRunDTO = InteractionRunDTO<CommandInteraction>;

type SlashCommandOptions = {
    name: string;
    description: string;
    options?: ApplicationCommandOptionData[];
    type?: ApplicationCommandType;
    category?: string;
    private?: boolean;
    run?: (executeDTO: SlashCommandRunDTO) => void;
};

interface ISlashCommand {
    name: string;
    description: string;
    options?: ApplicationCommandOptionData[];
    type?: ApplicationCommandType;
    category?: string;
    private?: boolean;
    run: (executeDTO: SlashCommandRunDTO) => void;
}

export {
    ISlashCommand,
    SlashCommandOptions,
    SlashCommandRunDTO,
}