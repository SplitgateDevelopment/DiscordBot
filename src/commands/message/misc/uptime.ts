import { EmbedBuilder } from 'discord.js';
import Command from '../../../util/structures/Command';

export default new Command({
    name: 'uptime',
    description: 'Retrieve the bot\'s uptime',
    run: async (client, message) => {
        
        const embed = new EmbedBuilder()
        .setTitle('Uptime 🔌')
        .setDescription(`The bot is online since <t:${client.utils.uptime().toFixed()}:R>`)
        .setColor('Blue');

        message.reply({
            embeds: [embed]
        });
    },
});