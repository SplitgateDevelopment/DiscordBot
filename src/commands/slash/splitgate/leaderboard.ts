import { CommandInteraction, EmbedBuilder } from 'discord.js';
import Bot from '../../../Bot';
import SlashCommand from '../../../util/structures/SlashCommand';

class LeaderboardCommand extends SlashCommand {
    constructor() {
        super({
            name: 'leaderboard',
            description: 'Retrieve the game leaderboard',
            options: [
                {
                    name: 'category',
                    description: 'Leaderboard category',
                    type: 3,
                    choices: [
                        { name: 'Takedown', value: 'RANKED_TEAM_TAKEDOWN' },
                        { name: '4v4', value: 'RANKED_TEAM_HARDCORE' },
                    ],
                    required: true,
                },
                {
                    name: 'platform',
                    description: 'Filter leaderboard via platform',
                    type: 3,
                    choices: [
                        { name: 'Playstation', value: 'PSN' },
                        { name: 'Xbox', value: 'XBOX' },
                        { name: 'Steam', value: 'STEAM' },
                    ]
                }
            ],
        });
    }
    
    async run (client: Bot, interaction: CommandInteraction) {
        const category = interaction.options.get('category')?.value?.toString() || '';
        const platform = interaction.options.get('platform')?.value?.toString();

        const data = await client.splitgate.getLeaderboard(category, platform);
        if (!data || data.length === 0) return interaction.reply({
            embeds: [client.embed({
                text: 'No data found for this leaderboard',
                type: 'error',
            })]
        });

        const { codeBlock } = client.utils;
        const description: string[] = [];

        for (let i = 0; i < 11; i++) description.push(`**• ${data[i].displayName}** (${codeBlock(data[i].value)})\n> ${codeBlock(data[i].compositeUserId.userId)} - **${data[i].compositeUserId.platform}** (${codeBlock(data[i].compositeUserId.platformId)})`)

        const embed = new EmbedBuilder()
        .setTitle(`Splitgate leaderboard (${category.split('_').pop()}${(platform?.length ?? 0) > 0 ? `, ${platform}` : ''}) 🏆`)
        .setColor('Gold')
        .setDescription(description.join('\n\n'))
        .setTimestamp(Date.now());

        interaction.reply({
            embeds: [embed]
        });
    }
}

export default new LeaderboardCommand;