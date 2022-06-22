import { EmbedBuilder } from 'discord.js';
import SlashCommand from '../../../util/structures/SlashCommand';

export default new SlashCommand({
    name: 'bpprogress',
    description: 'Retrieve user\'s seasonal battle pass progression',
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
        const data = await client.splitgate.getCurrentSeasonUserData(userId);

        const types = {
            freerewards: 'Free 🆓',
            premiumrewards: 'Premium 💵',
        } as { [key: string]: string };

        const { codeBlock, objectSize } = client.utils;
        const embed = new EmbedBuilder()
        .setTitle('Battle Pass Progression ⭐')
        .setColor('Yellow')
        .addFields([
            {
                name: '**❯ Level:**',
                value: codeBlock(`${data?.currentTierIndex}/${data?.lastTierIndex}`),
                inline: true
            },
            {
                name: '**❯ BP XP:**',
                value: codeBlock(`${data?.currentExp}/${data?.requiredExp}`),
                inline: true
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: true,
            },
            {
                name: '**❯ Type:**',
                value: codeBlock(data?.enrolledPasses.map((pass: string) => types[pass]).join('\n')),
                inline: true,
            },
            {
                name: '**❯ Xp Boost:**',
                value: codeBlock(`${data?.accumulatedXpBoost}%`),
                inline: true
            },
            {
                name: '**❯ Rewards To Claim:**',
                value: codeBlock(objectSize(data?.toClaimRewards)),
                inline: true
            },
            
        ])
        .setTimestamp(Date.now());

        interaction.reply({
            embeds: [embed]
        });
    },
});