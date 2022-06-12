import { constructorOptions } from '@schiacciata/logger/dist/src/structs';
import Bot from '../Bot';
import { ClientOptions } from './MongoClient';

type BotConfig = {
    bot: {
        id: string | undefined;
        token: string | undefined;
    };
    logger: constructorOptions;
    prefix: string;
    dev: devConfig;
    db: ClientOptions;
};

type devConfig = {
    ids: string[];
    guild: string;
};

type HandleFunction = (bot: Bot) => void;

interface BaseEmbedsOptions {
    type: EmbedTypes,
    text: string,
}

type EmbedTypes = 'success' | 'error';

export {
    BotConfig,
    HandleFunction,
    BaseEmbedsOptions,
};