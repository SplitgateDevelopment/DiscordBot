import { CommandInteraction, EmbedBuilder } from 'discord.js';
import Bot from '../../../Bot';
import { IUser } from '../../../types/User';
import SlashCommand from '../../../util/structures/SlashCommand';

class ReferralInfo extends SlashCommand {
    constructor() {
        super({
            name: 'referralinfo',
            description: 'Retrieve user\'s drops referral info',
            options: [
                {
                    name: 'userid',
                    description: 'Splitgate user identifier',
                    type: 3,
                }
            ],        
        })
    }

    async run (client: Bot, interaction: CommandInteraction, user: IUser) {
        const data = await client.splitgate.getReferralData(user.splitgateId);

        const { codeBlock } = client.utils;
        const embed = new EmbedBuilder()
        .setTitle('User referral data 🔗')
        .setColor('DarkButNotBlack')
        .addFields([
            {
                name: '**❯ Pass level:**',
                value: codeBlock(data?.passLevel || '0'),
                inline: true
            },
            {
                name: '**❯ Referrer id:**',
                value: codeBlock(data?.referrerId || '-----'),
                inline: true
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: true,
            },
            {
                name: '**Can be referred?**',
                value: codeBlock(data?.canBeReferred ? '☑️' : '❌'),
                inline: true
            },
        ])
        .setFooter({
            text: `${data?.seasonName} data` || ''
        })
        .setTimestamp(Date.now());

        interaction.reply({
            embeds: [embed]
        });
    }
}

export default new ReferralInfo;