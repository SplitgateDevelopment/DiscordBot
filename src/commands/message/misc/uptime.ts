import { Message, EmbedBuilder } from 'discord.js';
import Bot from '../../../Bot';
import Command from '../../../util/structures/Command';

class UptimeCommand extends Command {
    constructor() {
        super({
            name: 'uptime',
            description: 'Retrieve the bot\'s uptime',        
        })
    }

    async run (client: Bot, message: Message) {
        const embed = new EmbedBuilder()
        .setTitle('Uptime 🔌')
        .setDescription(`The bot is online since ${client.utils.getFormattedTimestamp(client.utils.uptime()*1000, 'R')}`)
        .setColor('Blue');

        message.reply({
            embeds: [embed]
        });
    }
}

export default new UptimeCommand;