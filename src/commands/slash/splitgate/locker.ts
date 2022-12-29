import { EmbedBuilder } from 'discord.js';
import SlashCommand from '../../../util/structures/SlashCommand';

export default new SlashCommand({
    name: 'locker',
    description: 'Retrieve user\'s locker',
    options: [
        {
            name: 'userid',
            description: 'Splitgate user identifier',
            type: 3,
            required: true
        }
    ],
    run: async (client, interaction) => {

        const input = interaction.options.get('userid');
        const userId = input?.value?.toString() || '';
        const { customizations, chosenCustomizations } = await client.splitgate.getCosmetics(userId);

        const { codeBlock } = client.utils;
        const embed = new EmbedBuilder()
        .setTitle('User Locker 👗')
        .setColor('DarkVividPink')
        .addFields(Object.keys(chosenCustomizations)
        .filter(k => k !== 'None')
        .map(k => {
            const value = chosenCustomizations[k].map((item: string) => {
                const [_, name, style] = item.split('_');
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
    },
});