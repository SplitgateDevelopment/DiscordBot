import { EmbedBuilder } from 'discord.js';
import { SlashCommandRunDTO } from '../../../types/SlashCommand';
import SlashCommand from '../../../util/structures/SlashCommand';

class BadgesCommand extends SlashCommand {
    constructor() {
        super({
            name: 'badges',
            description: 'Retrieve user\'s badges',
            options: [
                {
                    name: 'userid',
                    description: 'Splitgate user identifier',
                    type: 3,
                }
            ]
        });
    }
    
    async run ({ client, interaction, user }: SlashCommandRunDTO) {
        const badges = await client.splitgate.getBadges([user.splitgateId]);
        const { badgeProgress } = (badges)[user.splitgateId || ''];
        
        const { codeBlock } = client.utils;
        const fields = Object.keys(badgeProgress)
        .map(k => {
            const data = badgeProgress[k];
            const [, name] = k.split('_');

            return {
                name: name,
                value: `**❯ Tier:** ${codeBlock(data.currentTier+'/'+data.badge.tierTargets.pop())}\n**❯ Next level:** ${codeBlock(data.nextTierProgress.progress+'/'+data.nextTierProgress.target + ` (${data.nextTierProgress.tier})`)}`,
                inline: true, 
            }
        });

        const embed = new EmbedBuilder()
        .setTitle('User Badges 👮')
        .setColor('Blurple')
        .addFields(fields)
        .setTimestamp(Date.now());

        interaction.reply({
            embeds: [embed]
        });
    }
}

export default new BadgesCommand;