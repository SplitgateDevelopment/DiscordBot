import { EmbedBuilder } from 'discord.js';
import { SlashCommandRunDTO } from '../../../types/SlashCommand';
import { IUser } from '../../../types/User';
import SlashCommand from '../../../util/structures/SlashCommand';

class LinkCommand extends SlashCommand {
    constructor() {
        super({
            name: 'link',
            description: 'Link your discord account to your splitgate profile',
            options: [
                {
                    name: 'profileid',
                    description: 'Splitgate user identifier',
                    type: 3,
                    required: true
                }
            ]
        });
    }
    
    async run ({ client, interaction, user }: SlashCommandRunDTO) {

        const input = interaction.options.get('profileid');
        const userId = input?.value?.toString() || '';

        if (userId === user.splitgateId) return interaction.reply({
            embeds: [client.embed({
                text: 'Your discord account is already linked to your splitgate account',
                type: 'error'
            })],
            ephemeral: true,
        });
        
        const data = (await client.splitgate.getUserProfiles([userId]))?.data?.[0];
        if (!data) return interaction.reply({
            embeds: [client.embed({
                text: 'Could not find your splitgate profile',
                type: 'error'
            })],
            ephemeral: true,
        });

        try {
            const data: IUser = {
                id: interaction.user.id,
                splitgateId: userId,
            };
            
            await client.db.user.upsert({
                where: {
                    id: interaction.user.id,
                },
                update: data,
                create: data,
            });

        } catch (error) {
            return interaction.reply({
                embeds: [client.embed({
                    text: 'Could not link your profiles',
                    type: 'error'
                })],
                ephemeral: true,
            });
        }

        const { codeBlock } = client.utils;
        const fields = [
            {
                name: '**❯ Profile name:**',
                value: codeBlock(data.displayName),
            },
            {
                name: '**❯ Profile id:**',
                value: codeBlock(data.userId),
            },
        ];

        const platformKeys = Object.keys(data.platformUserIds);
        if (platformKeys.length > 0) fields.push({
            name: '**❯ Platform user ids:**',
            value: platformKeys.map(k => `**${k}:** ${codeBlock(data.platformUserIds[k])}`).join('\n')
        });

        const embed = new EmbedBuilder()
        .setTitle('Saved user 💾')
        .setColor('Green')
        .addFields(fields)
        .setTimestamp(Date.now());

        if (data.avatarUrl && data.avatarUrl.length > 0) embed.setThumbnail(data.avatarUrl); 

        interaction.reply({
            embeds: [embed]
        });
    }
}

export default new LinkCommand;