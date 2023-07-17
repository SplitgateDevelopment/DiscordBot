import { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } from 'discord.js';
import { view, viewButtonEmojis } from '../../../types/Shop';
import SlashCommand from '../../../util/structures/SlashCommand';
import ShopSelectMenu from '../../../interactions/selectmenus/shop';
import { SlashCommandRunDTO } from '../../../types/SlashCommand';

class ShopCommand extends SlashCommand {
    private readonly buttonEmojis: viewButtonEmojis;
    constructor() {
        super({
            name: 'shop',
            description: 'Retrieve the game daily item shop',
            options: [
                {
                    name: 'language',
                    description: '2 char language code (en, es, it...)',
                    type: 3,
                    min_length: 2,
                    max_length: 2,
                }
            ]
        });

        this.buttonEmojis = {
            'Esports': '🔫',
            'Daily Items': '🕑',
            'Value Bundle': '💸',
            'Featured Items': '✨',
        }
    }
    
    async run ({ client, interaction }: SlashCommandRunDTO) {
        const views: view[] = await client.splitgate.getViews(interaction.options.get('language')?.value?.toString());

        const embed = new EmbedBuilder()
        .setTitle('Item shop sections 🛒')
        .setColor('Orange')
        .setDescription(views.map(v => `**• ${v.title}** - Updated on ${client.utils.getFormattedTimestamp(v.updatedAt)}`).join('\n'))
        .setTimestamp(Date.now());

        const selectMenu = new ActionRowBuilder<StringSelectMenuBuilder>()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId(ShopSelectMenu.customId)
                .setPlaceholder('❌ Nothing selected')
                .addOptions(views.map(v => {
                    return {
                        label: v.title,
                        emoji: this.buttonEmojis[v.name],
                        value: v.viewId
                    }
                }),
            ),
        );

        interaction.reply({
            embeds: [embed],
            components: [selectMenu]
        });
    }
}

export default new ShopCommand;