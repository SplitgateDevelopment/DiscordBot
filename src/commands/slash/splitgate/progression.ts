import { EmbedBuilder } from 'discord.js';
import { SlashCommandRunDTO } from '../../../types/SlashCommand';
import SlashCommand from '../../../util/structures/SlashCommand';

class ProgressionCommand extends SlashCommand {
    constructor() {
        super({
            name: 'progression',
            description: 'Retrieve user\'s progression',
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
        const data = await client.splitgate.getProgression(user.splitgateId);

        const { codeBlock } = client.utils;
        const embed = new EmbedBuilder()
        .setTitle('User Progression 🕑')
        .setColor('DarkAqua')
        .addFields([
            {
                name: '**❯ Level:**',
                value: codeBlock(data.level),
                inline: true
            },
            {
                name: '**❯ Current XP:**',
                value: codeBlock(`${data.currentExp}/${data.requiredExp}`),
                inline: true
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: true,
            },
            {
                name: '**❯ Pro Level:**',
                value: codeBlock(data.proLevel),
                inline: true
            },
            {
                name: '**❯ Pro Tier:**',
                value: codeBlock(data.proTier),
                inline: true
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
        });
    }
}

export default new ProgressionCommand;