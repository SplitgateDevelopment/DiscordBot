import { ActivityType } from 'discord.js';
import Bot from '../Bot';
import Event from '../util/structures/Event';

export default new Event({
    name: 'ready',
    once: true,
    run: async (client: Bot) => {
        client.logger.success(`Logged in as ${client?.user?.tag}!`);

        client.user?.setPresence({
            activities: [{
                name: 'SPLITGATE',
                type: ActivityType.Competing,
                url: 'https://github.com/SplitgateDiscord/'
            }]
        });
    }
});