import { EmbedBuilder } from 'discord.js';
import SlashCommand from '../../../util/structures/SlashCommand';
import Utils from '../../../util/Utils';

export default new SlashCommand({
    name: 'feed',
    description: 'Retrieve splitgate feed status',
    run: async (client, interaction) => {

        const embed = new EmbedBuilder()
        .setTitle('Feed Status 📰')
        .setColor('#c8a2c8');

        const data = await client.splitgate.getFeedStatus();
        if (!data.length) {
            embed.setDescription('No feed status found');
            return interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        }

        if (data.length == 1) {
            await formatEmbed(embed, data[0], client.utils);
            return interaction.reply({
                embeds: [embed],
                ephemeral: true,
            })
        }

        data.forEach(async (item: any) => await formatEmbed(embed, item, client.utils));
        return interaction.reply({
            embeds: [embed],
            ephemeral: true,
        });
    },
});

function formatEmbed(embed: EmbedBuilder, data: any, utils: Utils) {
    const { isUrl, codeBlock } = utils;

    let val = data?.actionValue || 'N/A';
    if (isUrl(val)) val = `(${val})`;
    else val = '-'+codeBlock(val);

    embed.addFields([
        {
            name: data?.title?.en || '',
            value: (data?.description?.en || '') + `\n**${codeBlock('Action')}:** [**${data?.actionTitle?.en || ''}**]${val}`,
        }
    ])
    .setImage(data?.imageUrl || '');
}