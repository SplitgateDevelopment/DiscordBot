import { EmbedBuilder } from 'discord.js';
import SlashCommand from '../../../util/structures/SlashCommand';

export default new SlashCommand({
    name: 'stats',
    description: 'Retrieve user\'s statistics',
    options: [
        {
            name: 'userid',
            description: 'The user identifier to search for',
            type: 3,
            required: true
        }
    ],
    run: async (client, interaction) => {

        const input = interaction.options.get('userid');
        const userId = input?.value?.toString() || '';

        const data = await client.splitgate.getStats([userId]);
        const stats = data[userId]?.totalStats?.commonStats?.stats;
        
        const { codeBlock } = client.utils;
        const embed = new EmbedBuilder()
        .setTitle('Splitgate Stats 🌀')
        .setColor('#add8e6')
        .addFields([{
                name: '**❯ Kills:**',
                value: codeBlock(stats?.kills),
                inline: true,
            },
            {
                name: '**❯ Deaths:**',
                value: codeBlock(stats?.deaths),
                inline: true,
            },
            {
                name: '**❯ KD:**',
                value: codeBlock(stats?.kdRatio?.toString().slice(0, 5)),
                inline: true,
            },
            {
                name: '**❯ Accuracy:**',
                value: codeBlock(`${((stats?.accuracy || 0)*100).toString().slice(0, 5)}%`),
                inline: true,
            },
            {
                name: '**❯ Headshot Kills:**',
                value: codeBlock(stats?.headshotKills),
                inline: true,
            },
            {
                name: '**❯ Melee Kills:**',
                value: codeBlock(stats?.meleeKills),
                inline: true,
            },
            {
                name: '**❯ Assists:**',
                value: codeBlock(stats?.assists),
                inline: true,
            },
            {
                name: '**❯ Damage Dealt:**',
                value: codeBlock(stats?.damageDealt),
                inline: true,
            },
            {
                name: '**❯ Teabags:**',
                value: codeBlock(stats?.teabags),
                inline: true,
            },
        ])
        .setTimestamp(Date.now());

        interaction.reply({
            embeds: [embed]
        });
    },
});