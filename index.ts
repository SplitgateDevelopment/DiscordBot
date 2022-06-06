import Bot from './src/Bot';
import config from './config';
import { GatewayIntentBits, Partials } from 'discord.js';

const client = new Bot(config, {
    intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions] as GatewayIntentBits[],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction] as Partials[]
});
client.start();