import { CommandInteraction, EmbedBuilder } from 'discord.js';
import Bot from '../../../Bot';
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
                    required: true
                }
            ]
        });
    }
    
    async run (client: Bot, interaction: CommandInteraction) {

        const input = interaction.options.get('userid');
        const userId = input?.value?.toString() || '';
        const { badgeProgress } = (await client.splitgate.getBadges([userId]))[userId];
        
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