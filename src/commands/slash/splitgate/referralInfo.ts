import { EmbedBuilder } from 'discord.js';
import SlashCommand from '../../../util/structures/SlashCommand';

export default new SlashCommand({
    name: 'referralinfo',
    description: 'Retrieve user\'s drops referral info',
    options: [
        {
            name: 'userid',
            description: 'Splitgate user identifier',
            type: 3,
            required: true
        }
    ],
    run: async (client, interaction) => {

        const input = interaction.options.get('userid');
        const userId = input?.value?.toString() || '';
        const data = await client.splitgate.getReferralData(userId);

        const { codeBlock } = client.utils;
        const embed = new EmbedBuilder()
        .setTitle('User referral data 🔗')
        .setColor('DarkButNotBlack')
        .addFields([
            {
                name: '**❯ Pass level:**',
                value: codeBlock(data?.passLevel || '0'),
                inline: true
            },
            {
                name: '**❯ Referrer id:**',
                value: codeBlock(data?.referrerId || '-----'),
                inline: true
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: true,
            },
            {
                name: '**Can be referred?**',
                value: codeBlock(data?.canBeReferred ? '☑️' : '❌'),
                inline: true
            },
        ])
        .setFooter({
            text: `${data?.seasonName} data` || ''
        })
        .setTimestamp(Date.now());

        interaction.reply({
            embeds: [embed]
        });
    },
});