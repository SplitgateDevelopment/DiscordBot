import { ButtonInteraction, EmbedBuilder } from 'discord.js';
import Bot from '../../Bot';
import { IUser } from '../../types/User';
import Interaction from '../../util/structures/Interaction';

class ProfileInfoButton extends Interaction {
    constructor() {
        super({
            customId: 'ProfileInfo',
        })
    }

    async run (client: Bot, interaction: ButtonInteraction, user: IUser) {
        if (!user.splitgateId) return interaction.reply({
            embeds: [client.embed({
                text: 'You have don\'t have a linked profile',
                type: 'error'
            })],
            ephemeral: true,
        });

        const data = await client.splitgate.getUserProfile(user.splitgateId);
        const { codeBlock, getFormattedTimestamp } = client.utils;

        const profileEmbed = new EmbedBuilder()
        .setTitle('Profile Info `ℹ️`')
        .setColor('Blurple')
        .setFields([
            {
                name: '**❯ Display name:**',
                value: codeBlock(data.displayName),
            },
            {
                name: '**❯ Created at:**',
                value: getFormattedTimestamp(data.createdAt),
            },
        ])
        .setFooter({
            text: `ID: ${user.splitgateId}`,
        })

        return interaction.update({
            embeds: [profileEmbed],
        });
    }
}

export default new ProfileInfoButton;