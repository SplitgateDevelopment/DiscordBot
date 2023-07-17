import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import { SlashCommandRunDTO } from '../../../types/SlashCommand';
import SlashCommand from '../../../util/structures/SlashCommand';

class InviteCommand extends SlashCommand {
    constructor() {
        super({
            name: 'invite',
            description: 'Retrieve the bot\'s invite link',
        })
    }

    async run ({ client, interaction }: SlashCommandRunDTO) {

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
    }
}

export default new InviteCommand;