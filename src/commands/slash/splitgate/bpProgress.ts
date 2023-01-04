import { CommandInteraction, EmbedBuilder } from 'discord.js';
import Bot from '../../../Bot';
import { IUser } from '../../../types/User';
import SlashCommand from '../../../util/structures/SlashCommand';

class BpProgressCommand extends SlashCommand {
    constructor() {
        super({
            name: 'bpprogress',
            description: 'Retrieve user\'s seasonal battle pass progression',
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
        const data = await client.splitgate.getCurrentSeasonUserData(user.splitgateId);

        const types = {
            freerewards: 'Free 🆓',
            premiumrewards: 'Premium 💵',
        } as { [key: string]: string };

        const { codeBlock, objectSize } = client.utils;
        const embed = new EmbedBuilder()
        .setTitle('Battle Pass Progression ⭐')
        .setColor('Yellow')
        .addFields([
            {
                name: '**❯ Level:**',
                value: codeBlock(`${data?.currentTierIndex}/${data?.lastTierIndex}`),
                inline: true
            },
            {
                name: '**❯ BP XP:**',
                value: codeBlock(`${data?.currentExp}/${data?.requiredExp}`),
                inline: true
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: true,
            },
            {
                name: '**❯ Type:**',
                value: codeBlock(data?.enrolledPasses.map((pass: string) => types[pass]).join('\n')),
                inline: true,
            },
            {
                name: '**❯ Xp Boost:**',
                value: codeBlock(`${data?.accumulatedXpBoost}%`),
                inline: true
            },
            {
                name: '**❯ Rewards To Claim:**',
                value: codeBlock(objectSize(data?.toClaimRewards)),
                inline: true
            },
            
        ])
        .setTimestamp(Date.now());

        interaction.reply({
            embeds: [embed]
        });
    }
}

export default new BpProgressCommand;