import { EmbedBuilder } from 'discord.js';
import { SlashCommandRunDTO } from '../../../types/SlashCommand';
import SlashCommand from '../../../util/structures/SlashCommand';

class UptimeCommand extends SlashCommand {
    constructor() {
        super({
            name: 'uptime',
            description: 'Retrieve the bot\'s uptime',        
        })
    }

    async run ({ client, interaction }: SlashCommandRunDTO) {
        
        const embed = new EmbedBuilder()
        .setTitle('Uptime 🔌')
        .setDescription(`The bot is online since ${client.utils.getFormattedTimestamp(client.utils.uptime()*1000, 'R')}`)
        .setColor('Blue');

        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
}

export default new UptimeCommand;