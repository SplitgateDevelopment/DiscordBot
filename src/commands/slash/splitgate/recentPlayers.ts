import { EmbedBuilder } from 'discord.js';
import SlashCommand from '../../../util/structures/SlashCommand';

export default new SlashCommand({
    name: 'recentplayers',
    description: 'Retrieve user\'s recent players',
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
        
        const limit = 11;
        const data = await client.splitgate.getRecentPlayers(userId, limit);
        
        // Use a for loop since the api does not check the specified limit
        const users = [];
        for (let i = 0; i<limit; i++) {
            users[i] = data.data[i];
        }

        const { codeBlock } = client.utils;
        const embed = new EmbedBuilder()
        .setTitle('Recent players 👤')
        .setColor('Greyple')
        .setDescription(users.map((user: {
            namespace: string;
            other_display_name: string;
            other_id: string;
            user_id: string;
        }) => `**❯ ${user.other_display_name}:**\n${codeBlock(user.other_id)}`).join('\n'))
        .setTimestamp(Date.now());

        interaction.reply({
            embeds: [embed]
        });
    },
});