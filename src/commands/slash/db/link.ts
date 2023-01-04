import { CommandInteraction, EmbedBuilder } from 'discord.js';
import Bot from '../../../Bot';
import User from '../../../schemas/User';
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
    
    async run (client: Bot, interaction: CommandInteraction, user: IUser) {

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
            const userData = await User.findByIdAndUpdate(interaction.user.id, {
                splitgateId: userId,
            });
            if (!userData) await User.create({
                _id: interaction.user.id,
                splitgateId: userId,
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