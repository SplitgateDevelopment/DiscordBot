import { EmbedBuilder } from 'discord.js';
import SlashCommand from '../../../util/structures/SlashCommand';

export default new SlashCommand({
    name: 'dailystatus',
    description: 'Retrieve daily check-in status',
    options: [
        {
            name: 'userid',
            description: 'Splitgate user identifier',
            type: 3,
            required: true
        }
    ],
    run: async (client, interaction) => {

        if (!client.splitgate.authorized) return interaction.reply({
            embeds: [client.embed({
                type: 'error',
                text: 'The bot owner has not logged in on Splitgate yet'
            })],
            ephemeral: true
        });

        const input = interaction.options.get('userid');
        const userId = input?.value?.toString() || '';
        const data = await client.splitgate.getDailyCheckInStatus(userId);

        const { codeBlock } = client.utils;
        const embed = new EmbedBuilder()
        .setTitle('Daily check-in status 📬')
        .setColor('DarkGold')
        .addFields([
            {
                name: '**❯ Day of week:**',
                value: codeBlock(data.dayOfWeek),
                inline: true,
            },
            {
                name: '**❯ Claimed rewards:**',
                value: codeBlock(data.daysClaimedCount),
                inline: true,
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: true,
            },
            {
                name: '**❯ Missed days:**',
                value: codeBlock(data.daysMissedCount),
                inline: true,
            },
            {
                name: '**❯ Week ends at:**',
                value: `<t:${data.weekExpiresAtMs/1000}>`,
                inline: true,
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: true,
            },
        ])
        .setTimestamp(Date.now());

        interaction.reply({
            embeds: [embed]
        })
    },
});