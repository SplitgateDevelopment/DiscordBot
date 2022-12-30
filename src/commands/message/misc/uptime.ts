import { EmbedBuilder } from 'discord.js';
import Command from '../../../util/structures/Command';

export default new Command({
    name: 'uptime',
    description: 'Retrieve the bot\'s uptime',
    run: async (client, message) => {
        
        const { uptime, getFormattedTimestamp } = client.utils;
        const embed = new EmbedBuilder()
        .setTitle('Uptime 🔌')
        .setDescription(`The bot is online since ${getFormattedTimestamp(uptime(), 'R')}>`)
        .setColor('Blue');

        message.reply({
            embeds: [embed]
        });
    },
});