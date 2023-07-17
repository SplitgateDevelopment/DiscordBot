import { EmbedBuilder } from 'discord.js';
import { SlashCommandRunDTO } from '../../../types/SlashCommand';
import SlashCommand from '../../../util/structures/SlashCommand';

class LockerCommand extends SlashCommand {
    constructor() {
        super({
            name: 'locker',
            description: 'Retrieve user\'s locker',
            options: [
                {
                    name: 'userid',
                    description: 'Splitgate user identifier',
                    type: 3,
                }
            ]
        })
    }
    
    async run ({ client, interaction, user }: SlashCommandRunDTO) {
        const { customizations, chosenCustomizations } = await client.splitgate.getCosmetics(user.splitgateId);

        const { codeBlock } = client.utils;
        const embed = new EmbedBuilder()
        .setTitle('User Locker 👗')
        .setColor('DarkVividPink')
        .addFields(Object.keys(chosenCustomizations)
        .filter(k => k !== 'None')
        .map(k => {
            const value = chosenCustomizations[k].map((item: string) => {
                const [, name, style] = item.split('_');
                return style ? `${name} (${style})` : name;
              }).join(', ');

            return {
                name: `**${k}:**`,
                value: codeBlock(value),
                inline: true
            }
        })
        )
        .setFooter({
            text: `Total skins: ${Object.keys(customizations).map(k => customizations[k].length).reduce((a,c) => a+c)}`
        })
        .setTimestamp(Date.now());

        interaction.reply({
            embeds: [embed]
        });
    }
}

export default new LockerCommand;