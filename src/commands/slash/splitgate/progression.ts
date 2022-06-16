import { EmbedBuilder } from 'discord.js';
import SlashCommand from '../../../util/structures/SlashCommand';

export default new SlashCommand({
    name: 'progression',
    description: 'Retrieve user\'s progression',
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
        const data = await client.splitgate.getProgression(userId);

        const { codeBlock } = client.utils;
        const embed = new EmbedBuilder()
        .setTitle('User Progression 🕑')
        .setColor('DarkAqua')
        .addFields([
            {
                name: '**❯ Level:**',
                value: codeBlock(data.level),
                inline: true
            },
            {
                name: '**❯ Current XP:**',
                value: codeBlock(`${data.currentExp}/${data.requiredExp}`),
                inline: true
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: true,
            },
            {
                name: '**❯ Pro Level:**',
                value: codeBlock(data.proLevel),
                inline: true
            },
            {
                name: '**❯ Pro Tier:**',
                value: codeBlock(data.proTier),
                inline: true
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
        });
    },
});