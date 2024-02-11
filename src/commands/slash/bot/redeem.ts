import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { SlashCommandRunDTO } from '../../../types/SlashCommand';
import SlashCommand from '../../../util/structures/SlashCommand';

class RedeemCommand extends SlashCommand {
    constructor() {
        super({
            name: 'redeem',
            description: 'Redeem a code in the bot account',
            options: [
                {
                    name: 'code',
                    type: ApplicationCommandOptionType.String,
                    description: 'The code you want to redeem',
                    required: true
                },
                {
                    name: 'quantity',
                    type: ApplicationCommandOptionType.Integer,
                    description: 'The number of times to redeem',
                    minValue: 1,
                    maxValue: 10
                }
            ]
        });
    }
    
    async run ({ client, interaction }: SlashCommandRunDTO) {
        const code = interaction.options.get('code')?.value?.toString();
        const quantity = interaction.options.get('quantity')?.value || 1 as number;
        const embeds: EmbedBuilder[] = [];

        for (let i = 0; i < quantity; i++) {
            let embed;
            try {
                await client.splitgate.redeemCode(code);
                embed = client.embed({
                    text: 'Successfully redeem your code',
                    type: 'success'
                })
            } catch (error) {
                embed = client.embed({
                    text: `There was an error redeeming your code:\n> ${error}`,
                    type: 'error'
                })
            }

            embeds.push(embed);
        }

        interaction.reply({
            embeds,
        });
    }
}

export default new RedeemCommand;