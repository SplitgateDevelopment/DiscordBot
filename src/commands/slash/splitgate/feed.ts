import { EmbedBuilder } from 'discord.js';
import Bot from '../../../Bot';
import { SlashCommandRunDTO } from '../../../types/SlashCommand';
import SlashCommand from '../../../util/structures/SlashCommand';

class FeedCommand extends SlashCommand {
    constructor() {
        super({
            name: 'feed',
            description: 'Retrieve splitgate feed status',
        })
    }

    private formatEmbed(embed: EmbedBuilder, data: any, { utils }: Bot) {
        const { isUrl, codeBlock } = utils;
    
        let val = data?.actionValue || 'N/A';
        if (isUrl(val)) val = `(${val})`;
        else val = '-'+codeBlock(val);
    
        embed.addFields([
            {
                name: data?.title?.en || '',
                value: (data?.description?.en || '') + `\n**${codeBlock('Action')}:** [**${data?.actionTitle?.en || ''}**]${val}`,
            }
        ])
        .setImage(data?.imageUrl || '');
    }
    
    async run ({ client, interaction }: SlashCommandRunDTO) {

        const embed = new EmbedBuilder()
        .setTitle('Feed Status 📰')
        .setColor('#c8a2c8');

        const data = await client.splitgate.getFeedStatus();
        if (!data.length) {
            embed.setDescription('No feed status found');
            return interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        }

        if (data.length == 1) {
            await this.formatEmbed(embed, data[0], client);
            return interaction.reply({
                embeds: [embed],
                ephemeral: true,
            })
        }

        data.forEach(async (item: any) => await this.formatEmbed(embed, item, client));
        return interaction.reply({
            embeds: [embed],
            ephemeral: true,
        });
    }
}

export default new FeedCommand;