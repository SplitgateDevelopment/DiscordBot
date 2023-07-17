import { EmbedBuilder } from 'discord.js';
import { SlashCommandRunDTO } from '../../../types/SlashCommand';
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
    
    async run ({ client, interaction, user }: SlashCommandRunDTO) {
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