import { EmbedBuilder } from 'discord.js';
import SlashCommand from '../../../util/structures/SlashCommand';

export default new SlashCommand({
    name: 'invite',
    description: 'Retrieve the bot\'s invite link',
    run: async (client, interaction) => {
        const link = client.utils.inviteUrl();
        const embed = new EmbedBuilder()
        .setTitle('Invite me!')
        .setDescription(`**[Click Here](${link})**`)
        .setColor('Aqua')
        .setThumbnail(client.user?.avatarURL() || '');

        interaction.reply({
            embeds: [embed],
            ephemeral: true,
        })
    },
});