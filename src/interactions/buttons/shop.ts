import { ButtonInteraction, ColorResolvable, EmbedBuilder } from 'discord.js';
import Bot from '../../Bot';
import { viewSection, viewSections } from '../../types/Shop';
import Interaction from '../../util/structures/Interaction';

class ShopButton extends Interaction {
    colors: { [key in viewSections]: ColorResolvable; };
    constructor() {
        super({
            customId: 'ShopButton',
            authorOnly: false,
        })

        this.colors = {
            'Esports': 'Red',
            'Daily Items': 'Grey',
            'Value Bundle': 'Green',
            'Featured Items': 'Blurple',
        }
    }

    async run (client: Bot, interaction: ButtonInteraction) {
        const [, viewId, emoji] = await interaction.customId.split('_');
        const data = await client.splitgate.getViewSections(viewId);

        const { codeBlock } = client.utils;
        const embeds: EmbedBuilder[] = [];

        if (data.length === 0) return client.embed({
            text: 'No items found in this section',
            type: 'error'
        });

        data.forEach((section: viewSection) => 
            embeds.push(new EmbedBuilder()
                .setTitle(`${section.name} ${emoji}`)
                .setColor(this.colors[section.title])
                .addFields(section.items.map((item) => {

                    return {
                        name: `**${item.name}${item.customizationType ? ` (${item.customizationType})` : ''}**`,
                        value: `**❯** Price: ${codeBlock(item.regionData[0].price + ' ' + item.regionData[0].currencyCode)}\n**❯** ItemId: ${codeBlock(item.itemId)}`,
                        inline: true,
                    };
                }))
        ));

        await interaction.reply({
            embeds,
            ephemeral: true,
        })
    }
}

export default new ShopButton;