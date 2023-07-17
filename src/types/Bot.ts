import { constructorOptions } from '@schiacciata/logger/dist/src/structs';
import { BaseInteraction } from 'discord.js';
import Bot from '../Bot';
import { IUser } from './User';

type BotConfig = {
    bot: {
        id: string | undefined;
        token: string | undefined;
    };
    logger: constructorOptions;
    prefix: string;
    dev: devConfig;
    splitgate?: SplitgateOptions
};

type devConfig = {
    ids: string[];
    guild: string;
};

type SplitgateOptions = {
    redeemDaily?: boolean;
    token?: string;
    serverUrl?: string;
};

type HandleFunction = (bot: Bot) => void;

interface BaseEmbedsOptions {
    type: EmbedTypes,
    text: string,
}

type EmbedTypes = 'success' | 'error';
type slashCmdsMapTypes = 'private' | 'public';

type InteractionRunDTO<T = BaseInteraction> = {
    client: Bot;
    interaction: T;
    user: IUser;
};

export {
    BotConfig,
    HandleFunction,
    BaseEmbedsOptions,
    slashCmdsMapTypes,
    InteractionRunDTO,
};