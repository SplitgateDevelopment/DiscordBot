import { ApplicationCommandOptionData, ApplicationCommandType, CommandInteraction } from 'discord.js';
import Bot from '../Bot';
import { IUser } from './User';

type SlashCommandOptions = {
    name: string;
    description: string;
    options?: ApplicationCommandOptionData[];
    type?: ApplicationCommandType;
    category?: string;
    private?: boolean;
    run?: (client: Bot, interaction: CommandInteraction, user: IUser) => void;
};

interface ISlashCommand {
    name: string;
    description: string;
    options?: ApplicationCommandOptionData[];
    type?: ApplicationCommandType;
    category?: string;
    private?: boolean;
    run: (client: Bot, interaction: CommandInteraction, user: IUser) => void;
}

export {
    ISlashCommand,
    SlashCommandOptions,
}