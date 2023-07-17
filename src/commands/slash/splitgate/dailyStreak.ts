import { EmbedBuilder } from 'discord.js';
import { SlashCommandRunDTO } from '../../../types/SlashCommand';
import SlashCommand from '../../../util/structures/SlashCommand';

class DailyStreakCommand extends SlashCommand {
    constructor() {
        super({
            name: 'dailystreak',
            description: 'Retrieve daily check-in streak status',
            options: [
                {
                    name: 'userid',
                    description: 'Splitgate user identifier',
                    type: 3,
                }
            ]
        })
    }
    
    async run ({ client, interaction, user }: SlashCommandRunDTO) {
        const data = await client.splitgate.getDailyPlayStreak(user.splitgateId);

        const { codeBlock } = client.utils;
        const embed = new EmbedBuilder()
        .setTitle('Daily check-in streak 📬')
        .setColor('DarkGold')
        .addFields([
            {
                name: '**❯ Value:**',
                value: codeBlock(data.value),
                inline: true,
            },
            {
                name: '**❯ Previous value:**',
                value: codeBlock(data.previousValue),
                inline: true,
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: true,
            },
            {
                name: '**❯ Has played today?**',
                value: codeBlock(data.hasPlayedToday ? '☑️' : '❌'),
                inline: true,
            },
            {
                name: '**❯ XP boost:**',
                value: codeBlock(data.xpBoostPercentage + '%'),
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
    }
}

export default new DailyStreakCommand;