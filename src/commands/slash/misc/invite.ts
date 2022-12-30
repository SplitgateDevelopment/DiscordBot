import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import SlashCommand from '../../../util/structures/SlashCommand';

export default new SlashCommand({
    name: 'invite',
    description: 'Retrieve the bot\'s invite link',
    run: async (client, interaction) => {
        const link = client.utils.inviteUrl();
        const embed = new EmbedBuilder()
        .setTitle('Invite me!')
        .setColor('Aqua')
        .setThumbnail(client.user?.avatarURL() || '');

        const buttonRow = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
                    .setEmoji('🔗')
                    .setURL(link)
					.setLabel('Click Here!')
					.setStyle(ButtonStyle.Link),
			);

        interaction.reply({
            embeds: [embed],
            ephemeral: true,
            components: [buttonRow]
        })
    },
});