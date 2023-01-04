import { CommandInteraction, EmbedBuilder } from 'discord.js';
import { platformId } from 'splitgate.js/dist/src/typings/v2';
import Bot from '../../../Bot';
import SlashCommand from '../../../util/structures/SlashCommand';

class SearchCommand extends SlashCommand {
    constructor() {
        super({
            name: 'search',
            description: 'Retrieve user id via user\'s steamId',
            options: [
                {
                    name: 'profileid',
                    description: 'The user identifier to search for (NOT GAMERTAG)',
                    type: 3,
                    required: true
                },
                {
                    name: 'platform',
                    description: 'User platform',
                    type: 3,
                    required: true,
                    choices: [
                        {
                            name: 'Steam',
                            value: 'steam'
                        },
                        {
                            name: 'Xbox',
                            value: 'live'
                        },
                        {
                            name: 'Playstation',
                            value: 'ps5'
                        }
                    ]
                }
            ]
        });
    }

    async run (client: Bot, interaction: CommandInteraction) {

        const userId = interaction.options.get('profileid')?.value?.toString()  || '';
        const platform = (interaction.options.get('platform')?.value?.toString() || 'steam') as platformId;

        const data = await client.splitgate.getPlatformUser(platform, userId);
        const { codeBlock, getFormattedTimestamp } = client.utils;

        const embed = new EmbedBuilder()
        .setTitle('Search Results 🔎')
        .setColor('LuminousVividPink')
        .setThumbnail(data.avatarUrl)
        .setFields([
            {
                name: '**❯ Display name:**',
                value: codeBlock(data.displayName),
                inline: true
            },
            {
                name: '**❯ Bans:**',
                value: codeBlock(data.bans.length),
                inline: true
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: true,
            },
            {
                name: '**❯ Country:**',
                value: `${codeBlock(data.country)} :flag_${data.country.toLowerCase()}:`,
                inline: true
            },
            {
                name: '**❯ User id:**',
                value: codeBlock(data.userId),
                inline: true
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: true,
            },
            {
                name: '**❯ Email/Phone verified?**',
                value: ['email', 'phone'].map(k => codeBlock(`• ${k}: ${data[k + 'Verified'] ? '☑️' : '❌'}`)).join('\n'),
                inline: true
            },
            {
                name: '**❯ Date of creation:**',
                value: getFormattedTimestamp(data.createdAt),
                inline: true
            },
        ])
        
        interaction.reply({
            embeds: [embed]
        })
    }
}

export default new SearchCommand;