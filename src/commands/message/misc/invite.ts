
import { EmbedBuilder } from 'discord.js';
import Command from '../../../util/structures/Command';

export default new Command({
    name: 'invite',
    description: 'Retrieve the bot\'s invite link',
    run: async (client, message) => {
        
        const link = client.utils.inviteUrl();
        const embed = new EmbedBuilder()
        .setTitle('Invite me!')
        .setDescription(`**[Click Here](${link})**`)
        .setColor('Aqua')
        .setThumbnail(client.user?.avatarURL() || '');

        message.reply({
            embeds: [embed]
        });
    },
});