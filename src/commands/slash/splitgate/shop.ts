import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder } from 'discord.js';
import Bot from '../../../Bot';
import { view, viewButtonData } from '../../../types/Shop';
import SlashCommand from '../../../util/structures/SlashCommand';

class ShopCommand extends SlashCommand {
    buttonData: viewButtonData;
    constructor() {
        super({
            name: 'shop',
            description: 'Retrieve the game daily item shop',
        });

        this.buttonData = {
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
    }

    async run(client: Bot, interaction: CommandInteraction) {
        const views: view[] = await client.splitgate.getViews();

        const embed = new EmbedBuilder()
        .setTitle('Item shop sections 🛒')
        .setColor('Orange')
        .setDescription(views.map(v => `**• ${v.title}** - Updated on ${client.utils.getFormattedTimestamp(v.updatedAt)}`).join('\n'))
        .setTimestamp(Date.now());

        const buttonRow = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(views.map(v => {
                const { emoji, style } = this.buttonData[v.title];
                return new ButtonBuilder()
                .setEmoji(emoji)
                .setCustomId(`ShopButton_${v.viewId}_${emoji}`)
                .setLabel(v.title)
                .setStyle(style)
            }));

        interaction.reply({
            embeds: [embed],
            components: [buttonRow]
        });
    }
}

export default new ShopCommand;