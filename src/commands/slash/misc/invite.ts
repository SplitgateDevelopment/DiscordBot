import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder } from 'discord.js';
import Bot from '../../../Bot';
import SlashCommand from '../../../util/structures/SlashCommand';

class InviteCommand extends SlashCommand {
    constructor() {
        super({
            name: 'invite',
            description: 'Retrieve the bot\'s invite link',
        })
    }

    async run (client: Bot, interaction: CommandInteraction) {
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