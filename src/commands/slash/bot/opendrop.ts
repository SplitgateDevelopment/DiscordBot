import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { SlashCommandRunDTO } from '../../../types/SlashCommand';
import SlashCommand from '../../../util/structures/SlashCommand';

class OpenDropCommand extends SlashCommand {
    constructor() {
        super({
            name: 'opendrop',
            description: 'Open a drop in the bot account',
            options: [
                {
                    name: 'quantity',
                    type: ApplicationCommandOptionType.Integer,
                    description: 'The quantity of drops you want to open',
                    minValue: 1,
                    maxValue: 10
                }
            ]
        });
    }
    
    async run ({ client, interaction }: SlashCommandRunDTO) {
        const quantity = interaction.options.get('quantity')?.value || 1 as number;
        const embeds: EmbedBuilder[] = [];

        for (let i = 0; i < quantity; i++) {
            const data = await client.splitgate.openDrop();
            const { customizationType, customizationValue } = data.customizations[0];

            const { codeBlock } = client.utils;
            const embed = new EmbedBuilder()
            .setTitle('Opened drop 🧺')
            .setColor('Random')
            .addFields([
                {
                    name: '**❯ Item:**',
                    value: codeBlock(customizationValue),
                    inline: true
                },
                {
                    name: '**❯ Type:**',
                    value: codeBlock(customizationType),
                    inline: true
                },
            ])
            .setFooter({
                text: `Remaining drops: ${data.dropCount}`
            })
            .setTimestamp(Date.now());

            embeds.push(embed);
        }

        interaction.reply({
            embeds,
        });
    }
}

export default new OpenDropCommand;