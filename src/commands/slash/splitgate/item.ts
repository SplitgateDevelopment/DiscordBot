import { EmbedBuilder } from 'discord.js';
import { item } from '../../../types/Shop';
import { SlashCommandRunDTO } from '../../../types/SlashCommand';
import SlashCommand from '../../../util/structures/SlashCommand';

class ItemCommand extends SlashCommand {
    constructor() {
        super({
            name: 'items',
            description: 'Retrieve infos about an item or more from the shop',
            options: [
                {
                    name: 'itemids',
                    description: 'Splitgate item/items identifier (separated by comma)',
                    type: 3,
                    required: true
                }
            ]
        });
    }
    
    async run ({ client, interaction }: SlashCommandRunDTO) {

        const input = interaction.options.get('itemids');
        const itemIds = input?.value?.toString() || '';
        const items: item[] = await client.splitgate.getItems(itemIds.split(',').filter(i => i.length > 0));

        if (items.length === 0) return interaction.reply({
            embeds: [client.embed({
                type: 'error',
                text: 'No items found',
            })],
            ephemeral: true
        })

        const { codeBlock, getFormattedTimestamp } = client.utils;
        const embeds: EmbedBuilder[] = [];
        for (const i in items) {
            if (i === '10') break;
            const item = items[i];

            const embedFields = [
                {
                    name: '**❯ Price:**',
                    value: codeBlock(item.regionData[0].price + ' ' + item.regionData[0].currencyCode),
                    inline: true
                },
                {
                    name: '**❯ Rarity:**',
                    value: codeBlock(item.rarity),
                    inline: true
                },
                {
                    name: '**❯ Purchasable?**',
                    value: codeBlock((item.purchasable ? '☑️' : '❌') + `(${item.maxCountPerUser ?? '?'} per user)`),
                    inline: true
                },
                {
                    name: '**❯ Item type:**',
                    value: codeBlock(`${item.itemType}${item.customizationType ? ` (${item.customizationType})` : ''}`),
                    inline: true
                },
                {
                    name: '**❯ Created at:**',
                    value: getFormattedTimestamp(item.createdAt),
                    inline: true
                },
            ];

            if (item.categoryPath) embedFields.push({
                name: '**❯ Files path:**',
                value: codeBlock(item.categoryPath),
                inline: true
            })

            const embed = new EmbedBuilder()
                .setTitle(item.title)
                .setColor('Random')
                .addFields(embedFields)
                .setFooter({
                    text: item.itemId,
                })
                .setTimestamp(new Date(item.updatedAt));

            if (item.thumbnailUrl && item.thumbnailUrl.length > 0) embed.setImage(item.thumbnailUrl);

            embeds.push(embed);
        }
        
        await interaction.reply({
            embeds,
        });
    }
}

export default new ItemCommand;