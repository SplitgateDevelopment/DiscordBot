import { EmbedBuilder } from 'discord.js';
import SlashCommand from '../../../util/structures/SlashCommand';

export default new SlashCommand({
    name: 'uptime',
    description: 'Retrieve the bot\'s uptime',
    run: async (client, interaction) => {
        
        const { uptime, getFormattedTimestamp } = client.utils;
        const embed = new EmbedBuilder()
        .setTitle('Uptime 🔌')
        .setDescription(`The bot is online since ${getFormattedTimestamp(uptime(), 'R')}>`)
        .setColor('Blue');

        interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    },
});