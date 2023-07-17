import { EmbedBuilder } from 'discord.js';
import { SlashCommandRunDTO } from '../../../types/SlashCommand';
import SlashCommand from '../../../util/structures/SlashCommand';

class StreamCommand extends SlashCommand {
    constructor() {
        super({
            name: 'stream',
            description: 'Check whether the splitgate official channel is live or not',        
        })
    }
    
    async run ({ client, interaction }: SlashCommandRunDTO) {
        const data = await client.splitgate.getStreamStatus();
        
        const embed = new EmbedBuilder()
        .setTitle('Splitgate Stream 📺')
        .setColor('Purple')
        .addFields([
            {
                name: '**❯ Is Live:**',
                value: data?.isLive ? 'Yes ☑️' : 'No ❌',
            },
            {
                name: '**❯ Stream URL:**',
                value: data?.actionValue || 'No stream URL',
            }
        ])
        .setTimestamp(Date.now());

        if (data?.isLive && data?.imageUrl) embed.setThumbnail(data?.imageUrl || '');

        interaction.reply({
            embeds: [embed]
        });
    }
}

export default new StreamCommand;