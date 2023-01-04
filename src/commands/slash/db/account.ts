import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder } from 'discord.js';
import Bot from '../../../Bot';
import { IUser } from '../../../types/User';
import SlashCommand from '../../../util/structures/SlashCommand';
import ProfileInfoButton from '../../../interactions/buttons/profileinfo';
import UnlinkButton from '../../../interactions/buttons/unlink';

class AccountCommand extends SlashCommand {
    constructor() {
        super({
            name: 'account',
            description: 'Retrieve linked account id',
        });
    }
    
    async run (client: Bot, interaction: CommandInteraction, user: IUser) {
        if (!user.splitgateId) return interaction.reply({
            embeds: [client.embed({
                text: 'You don\'t not have a linked profile yet, use the </link:1> command.',
                type: 'error'
            })],
            ephemeral: true,
        });
        
        const embed = new EmbedBuilder()
        .setTitle('Linked Profile 🌿')
        .setColor('Blue')
        .setThumbnail(interaction.user.avatarURL())
        .setDescription(client.utils.codeBlock(user.splitgateId));

        const buttonRow = new ActionRowBuilder<ButtonBuilder>()
            .addComponents([
                new ButtonBuilder()
                .setEmoji('ℹ️')
                .setCustomId(ProfileInfoButton.customId)
                .setLabel('Info')
                .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                .setEmoji('🔗')
                .setCustomId(UnlinkButton.customId)
                .setLabel('Unlink')
                .setStyle(ButtonStyle.Danger),
            ]);

        interaction.reply({
            embeds: [embed],
            components: [buttonRow]
        });
    }
}

export default new AccountCommand;