import { CommandInteraction, EmbedBuilder } from 'discord.js';
import Bot from '../../../Bot';
import SlashCommand from '../../../util/structures/SlashCommand';

class ActiveChallengesCommand extends SlashCommand {
    constructor() {
        super({
            name: 'activechallenges',
            description: 'Retrieve active game challenges',
        });
    }
    
    async run (client: Bot, interaction: CommandInteraction) {
        const data = await client.splitgate.getChallengesState();
        const { codeBlock, getFormattedTimestamp } = client.utils;

        const fields = Object.keys(data).map(k => {
            const value = data[k];
            return {
                name: `**${k[0].toUpperCase()}${k.slice(1)}**`,
                value: `**❯ Active:** ${value.isActive}\n**❯ Current phase:** ${value.currentPhase}\n**❯ Challenges:** ${codeBlock(value.challengeIds.length > 0 ? value.challengeIds.join(', ') : 'No challenges')}\n**❯ Expiration:** ${getFormattedTimestamp(value.expirationTimeMs)}\n`,
                inline: true,
            }
        });
        fields.splice(2, 0, {
            name: '\u200b',
            value: '\u200b',
            inline: true,
        });

        const embed = new EmbedBuilder()
        .setTitle('Active game challenges 📂')
        .setColor('DarkOrange')
        .addFields(fields)
        .setTimestamp(Date.now());

        interaction.reply({
            embeds: [embed]
        });
    }
}

export default new ActiveChallengesCommand;