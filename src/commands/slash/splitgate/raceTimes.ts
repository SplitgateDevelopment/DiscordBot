import { APIEmbedField, EmbedBuilder } from 'discord.js';
import SlashCommand from '../../../util/structures/SlashCommand';

export default new SlashCommand({
    name: 'racetimes',
    description: 'Retrieve user\'s racetimes',
    options: [
        {
            name: 'userid',
            description: 'Splitgate user identifier',
            type: 3,
            required: true
        },
        {
            name: 'platform',
            description: 'User platform',
            type: 3,
            required: false,
            choices: [
                {
                    name: 'Steam',
                    value: 'STEAM'
                },
                {
                    name: 'Xbox',
                    value: 'XBOX'
                },
                {
                    name: 'Playstation',
                    value: 'PSN'
                }
            ]
        }
    ],
    run: async (client, interaction) => {

        const input = interaction.options.get('userid');
        const userId = input?.value?.toString() || '';
        const platform = interaction.options.get('platform')?.value?.toString() || 'STEAM';

        const data = await client.splitgate.getRaceTimes(userId, platform);

        const { objectSize, codeBlock } = client.utils;
        const embed = new EmbedBuilder()
        .setTitle('Race Times 🗺️')
        .setColor('Navy')
        .setTimestamp(Date.now());

        if (objectSize(data?.bestTimes || {}) === 0) embed.setDescription(codeBlock('User has not race times registered'));
        else {
            const fields = [] as APIEmbedField[]

            const maps = Object.keys(data?.bestTimes || {});
            maps.forEach((m: string) => {
                fields.push({
                    name: m,
                    value: codeBlock(`• Easy: ${data?.bestTimes?.[m]?.Easy || 'N/A'} \n• Medium: ${data?.bestTimes?.[m]?.Medium || 'N/A'} \n• Hard: ${data?.bestTimes?.[m]?.Hard || 'N/A'}`),
                    inline: true
                });
            });

            embed.addFields(fields);
        }

        interaction.reply({
            embeds: [embed]
        });
    },
});