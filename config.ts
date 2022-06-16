import 'dotenv/config';
import { BotConfig } from './src/types/Bot';

const config: BotConfig = Object.freeze({
    bot: {
        id: process.env?.BOT_ID || '',
        token: process.env?.BOT_TOKEN || ''
    },
    logger: {
        symbols: true,
        text: true,
        date: false,
    },
    prefix: 's!',
    dev: {
        ids: [process.env.OWNER_ID || ''],
        guild: process.env.DEV_GUILD_ID || ''
    },
    db: {
        uri: process.env.DB_URI,
    },
    splitgate: {
        redeemDaily: true,
    }
});

export default config;