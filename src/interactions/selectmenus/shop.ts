import { StringSelectMenuInteraction, ColorResolvable, EmbedBuilder } from 'discord.js';
import { InteractionRunDTO } from '../../types/Bot';
import { viewSection, viewSections } from '../../types/Shop';
import Interaction from '../../util/structures/Interaction';

class ShopSelectMenu extends Interaction {
    private readonly colors: { [key in viewSections]: ColorResolvable; };
    constructor() {
        super({
            customId: 'ShopSelectMenu',
        })

        this.colors = {
            'Esports': 'Red',
            'Daily Items': 'Grey',
            'Value Bundle': 'Green',
            'Featured Items': 'Blurple',
        }
    }
    
    async run ({ client, interaction }: InteractionRunDTO<StringSelectMenuInteraction>) {
        const viewId = interaction.values[0];
        const data = await client.splitgate.getViewSections(viewId);

        const { codeBlock } = client.utils;
        const embeds: EmbedBuilder[] = [];

        if (data.length === 0) return interaction.reply({
            embeds: [client.embed({
                text: 'No items found in this section',
                type: 'error'
            })],
            ephemeral: true,
        })

        data.forEach((section: viewSection) => 
            embeds.push(new EmbedBuilder()
                .setTitle(`${section.name}`)
                .setColor(this.colors[section.title])
                .addFields(section.items.map((item) => {

                    return {
                        name: `**${item.name}${item.customizationType ? ` (${item.customizationType})` : ''}**`,
                        value: `**❯** Price: ${codeBlock(item.regionData[0].price + ' ' + item.regionData[0].currencyCode)}\n**❯** ItemId: ${codeBlock(item.itemId)}`,
                        inline: true,
                    };
                }))
        ));

        await interaction.update({
            embeds,
        })
    }
}

export default new ShopSelectMenu;