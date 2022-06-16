import { EmbedBuilder } from 'discord.js';
import SlashCommand from '../../../util/structures/SlashCommand';

export default new SlashCommand({
    name: 'stats',
    description: 'Retrieve user's statistics',
    options: [
        {
            name: 'userid',
            description: 'The user identifier to search for',
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

        const data = await client.splitgate.getStats([userId]);
        
        const stats = data[userId]?.totalStats?.commonStats?.stats;
        const embed = new EmbedBuilder()
        .setTitle('Splitgate Stats 🌀')
        .setColor('#add8e6')
        .addFields([{
                name: '**❯ Kills:**',
                value: stats.kills.toString(),
                inline: true,
            },
            {
                name: '**❯ Deaths:**',
                value: stats.deaths.toString(),
                inline: true,
            },
            {
                name: '**❯ KD:**',
                value: stats.kdRatio.toString().slice(0, 5),
                inline: true,
            },
            {
                name: '**❯ Accuracy:**',
                value: `${(stats.accuracy*100).toString().slice(0, 4)}%`,
                inline: true,
            },
            {
                name: '**❯ Headshot Kills:**',
                value: stats.headshotKills.toString(),
                inline: true,
            },
            {
                name: '**❯ Melee Kills:**',
                value: stats.meleeKills.toString(),
                inline: true,
            },
        ])
        .setTimestamp(Date.now());

        interaction.reply({
            embeds: [embed]
        });
    },
});