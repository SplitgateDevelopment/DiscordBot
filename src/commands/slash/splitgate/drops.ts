import { EmbedBuilder } from 'discord.js';
import SlashCommand from '../../../util/structures/SlashCommand';

export default new SlashCommand({
    name: 'drops',
    description: 'Retrieve user\'s drops count',
    options: [
        {
            name: 'userid',
            description: 'Splitgate user identifier',
            type: 3,
            required: true
        }
    ],
    run: async (client, interaction) => {

        const input = interaction.options.get('userid');
        const userId = input?.value?.toString() || '';
        const data = await client.splitgate.getDrops(userId);

        const { codeBlock } = client.utils;
        const embed = new EmbedBuilder()
        .setTitle('User Drops 📦')
        .setColor('Greyple')
        .addFields([
            {
                name: '**❯ Count:**',
                value: codeBlock(data?.count),
                inline: true
            },
            
        ])
        .setTimestamp(Date.now());

        interaction.reply({
            embeds: [embed]
        });
    },
});