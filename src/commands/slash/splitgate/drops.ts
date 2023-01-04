import { CommandInteraction, EmbedBuilder } from 'discord.js';
import Bot from '../../../Bot';
import { IUser } from '../../../types/User';
import SlashCommand from '../../../util/structures/SlashCommand';

class DropsCommand extends SlashCommand {
    constructor() {
        super({
            name: 'drops',
            description: 'Retrieve user\'s drops count',
            options: [
                {
                    name: 'userid',
                    description: 'Splitgate user identifier',
                    type: 3,
                }
            ]
        });
    }
    
    async run (client: Bot, interaction: CommandInteraction, user: IUser) {
        const data = await client.splitgate.getDrops(user.splitgateId);

        const { codeBlock } = client.utils;
        const embed = new EmbedBuilder()
        .setTitle('User Drops 📦')
        .setColor('Greyple')
        .addFields([
            {
                name: '**❯ Count:**',
                value: codeBlock(data?.count),
                inline: true
            },
            
        ])
        .setTimestamp(Date.now());

        interaction.reply({
            embeds: [embed]
        });
    }
}

export default new DropsCommand;