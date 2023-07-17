import { EmbedBuilder } from 'discord.js';
import { SlashCommandRunDTO } from '../../../types/SlashCommand';
import SlashCommand from '../../../util/structures/SlashCommand';

class RecentPlayersCommand extends SlashCommand {
    constructor() {
        super({
            name: 'recentplayers',
            description: 'Retrieve user\'s recent players',
            options: [
                {
                    name: 'userid',
                    description: 'Splitgate user identifier',
                    type: 3,
                }
            ],        
        })
    }
    
    async run ({ client, interaction, user }: SlashCommandRunDTO) {
        
        const limit = 11;
        const data = await client.splitgate.getRecentPlayers(user.splitgateId, limit);
        
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
    }
}

export default new RecentPlayersCommand;