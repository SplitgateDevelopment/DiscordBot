
import { EmbedBuilder } from 'discord.js';
import Command from '../../../util/structures/Command';

export default new Command({
    name: 'whoami',
    description: 'Retrieve infos about the account used by the bot.',
    ownerOnly: true,
    run: async (client, message) => {
        if (!client.splitgate.authorized) return message.reply({
            embeds: [client.embed({
                type: 'error',
                text: 'Looks like you have not logged in on Splitgate yet!',
            })]
        });

        const { user } = client.splitgate;
        const { codeBlock } = client.utils;

        const embed = new EmbedBuilder()
        .setAuthor({
            name: client.user?.username || '',
            iconURL: client.user?.displayAvatarURL() || '',
        })
        .addFields([
            {
                name: '**❯ Username:**',
                value: codeBlock(user?.name || ''),
            },
            {
                name: '**❯ ID:**',
                value: codeBlock(user?.id || ''),
            },
            {
                name: '**❯ Platform:**',
                value: codeBlock(user?.platform?.userId?.concat(` (${user?.platform?.id})`) || ''),
            },
            {
                name: '**❯ XUID:**',
                value: codeBlock(user?.xuid || 'Unknown'),
            },
        ]);

        if (user.bans && user.bans?.length > 0) embed.addFields([{
            name: '**❯ Bans:**',
            value: codeBlock(user?.bans.join('\n')),
        }]);

        message.reply({
            embeds: [embed]
        });
    },
});