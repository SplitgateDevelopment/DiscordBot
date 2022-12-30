import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import { view, viewButtonData } from '../../../types/Shop';
import SlashCommand from '../../../util/structures/SlashCommand';

export default new SlashCommand({
    name: 'shop',
    description: 'Retrieve the game daily item shop',
    run: async (client, interaction) => {
        const buttonData: viewButtonData = {
            'Esports': {
               emoji: '🔫',
               style: ButtonStyle.Danger 
            },
            'Daily Items': {
                emoji: '🕑',
                style: ButtonStyle.Secondary 
             },
            'Value Bundle': {
                emoji: '💸',
                style: ButtonStyle.Success 
             },
            'Featured Items': {
                emoji: '✨',
                style: ButtonStyle.Primary 
             },
        }
        const views: view[] = await client.splitgate.getViews();

        const embed = new EmbedBuilder()
        .setTitle('Item shop sections 🏪')
        .setColor('Red')
        .setDescription(views.map(v => `**${v.title}** - Updated on <t:${(new Date(v.updatedAt).getTime()/1000).toFixed()}>`).join('\n'))
        .setTimestamp(Date.now());

        const buttonRow = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(views.map(v => {
                const { emoji, style } = buttonData[v.title];
                return new ButtonBuilder()
                .setEmoji(emoji)
                .setCustomId(`view_${v.viewId}`)
                .setLabel(v.title)
                .setStyle(style)
            }));

        interaction.reply({
            embeds: [embed],
            components: [buttonRow]
        });
    },
});