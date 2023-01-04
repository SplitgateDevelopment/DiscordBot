import { CommandInteraction, EmbedBuilder } from 'discord.js';
import Bot from '../../../Bot';
import { IUser } from '../../../types/User';
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
    
    async run (client: Bot, interaction: CommandInteraction, user: IUser) {
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