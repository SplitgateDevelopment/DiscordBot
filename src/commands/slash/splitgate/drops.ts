import { CommandInteraction, EmbedBuilder } from 'discord.js';
import Bot from '../../../Bot';
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
                    required: true
                }
            ]
        });
    }
    
    async run (client: Bot, interaction: CommandInteraction) {

        const input = interaction.options.get('userid');
        const userId = input?.value?.toString() || '';
        const data = await client.splitgate.getDrops(userId);

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