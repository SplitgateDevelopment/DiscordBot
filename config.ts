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
        ids: [''],
        guild: '777148073032810526'
    },
    db: {
        uri: process.env.DB_URI,
    },
});

export default config;