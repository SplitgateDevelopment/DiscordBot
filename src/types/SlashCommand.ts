import { ApplicationCommandOptionData, ApplicationCommandType, CommandInteraction } from 'discord.js';
import Bot from '../Bot';

type SlashCommandOptions = {
    name: string;
    description: string;
    options?: ApplicationCommandOptionData[];
    type?: ApplicationCommandType;
    run: (client: Bot, interaction: CommandInteraction) => void;
};

interface ISlashCommand {
    name: string;
    description: string;
    options?: ApplicationCommandOptionData[];
    type?: ApplicationCommandType;
    run: (client: Bot, interaction: CommandInteraction) => void;
}

export {
    ISlashCommand,
    SlashCommandOptions,
}