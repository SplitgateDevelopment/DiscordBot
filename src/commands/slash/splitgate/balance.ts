import { EmbedBuilder } from 'discord.js';
import { SlashCommandRunDTO } from '../../../types/SlashCommand';
import SlashCommand from '../../../util/structures/SlashCommand';

class BalanceCommand extends SlashCommand {
    constructor() {
        super({
            name: 'balance',
            description: 'Retrieve user\'s balance',
            options: [
                {
                    name: 'userid',
                    description: 'Splitgate user identifier',
                    type: 3,
                }
            ],
        });
    }
    
    async run ({ client, interaction, user }: SlashCommandRunDTO) {
        const data = await client.splitgate.getWallet(user.splitgateId);

        const { codeBlock } = client.utils;
        const embed = new EmbedBuilder()
        .setTitle('User balance 💵')
        .setColor('Green')
        .setDescription(codeBlock(`${parseInt(data.balance).toLocaleString()} ${data.currencySymbol}`))
        .setTimestamp(Date.now());

        interaction.reply({
            embeds: [embed]
        });
    }
}

export default new BalanceCommand;