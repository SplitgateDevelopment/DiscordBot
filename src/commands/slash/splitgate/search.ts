import { EmbedBuilder } from 'discord.js';
import SlashCommand from '../../../util/structures/SlashCommand';

export default new SlashCommand({
    name: 'search',
    description: 'Retrieve user id via user\'s steamId',
    options: [
        {
            name: 'steamid',
            description: 'The steam user identifier to search for',
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

        const input = interaction.options.get('steamid');
        const steamId = input?.value?.toString() || '';

        const data = await client.splitgate.getUserProfilesSteam([steamId]);
        const info = data?.userIdPlatforms[0];
        const embed = new EmbedBuilder()
        .setTitle('Search Results 🔎')
        .setColor('LuminousVividPink')
        .setDescription(`**❯ UserId:** \`${info?.userId}\`\n**❯ Platform:** \`${info?.platformId}\``);
        
        interaction.reply({
            embeds: [embed]
        })
    },
});