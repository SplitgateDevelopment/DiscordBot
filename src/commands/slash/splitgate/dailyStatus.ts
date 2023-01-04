import { CommandInteraction, EmbedBuilder } from 'discord.js';
import Bot from '../../../Bot';
import { IUser } from '../../../types/User';
import SlashCommand from '../../../util/structures/SlashCommand';

class DailyStatusCommand extends SlashCommand {
    constructor() {
        super({
            name: 'dailystatus',
            description: 'Retrieve daily check-in status',
            options: [
                {
                    name: 'userid',
                    description: 'Splitgate user identifier',
                    type: 3,
                }
            ]
        })
    }
    
    async run (client: Bot, interaction: CommandInteraction, user: IUser) {
        const data = await client.splitgate.getDailyCheckInStatus(user.splitgateId);

        const { codeBlock, getFormattedTimestamp } = client.utils;
        const embed = new EmbedBuilder()
        .setTitle('Daily check-in status 📬')
        .setColor('DarkGold')
        .addFields([
            {
                name: '**❯ Day of week:**',
                value: codeBlock(data.dayOfWeek),
                inline: true,
            },
            {
                name: '**❯ Claimed rewards:**',
                value: codeBlock(data.daysClaimedCount),
                inline: true,
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: true,
            },
            {
                name: '**❯ Missed days:**',
                value: codeBlock(data.daysMissedCount),
                inline: true,
            },
            {
                name: '**❯ Week ends at:**',
                value: getFormattedTimestamp(data.weekExpiresAtMs),
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

export default new DailyStatusCommand;