import { APIEmbedField, CommandInteraction, EmbedBuilder } from 'discord.js';
import Bot from '../../../Bot';
import { IUser } from '../../../types/User';
import SlashCommand from '../../../util/structures/SlashCommand';

class RaceTimesCommand extends SlashCommand {
    constructor() {
        super({
            name: 'racetimes',
            description: 'Retrieve user\'s racetimes',
            options: [
                {
                    name: 'userid',
                    description: 'Splitgate user identifier',
                    type: 3,
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
        })
    }

    async run (client: Bot, interaction: CommandInteraction, user: IUser) {
        const platform = interaction.options.get('platform')?.value?.toString() || 'STEAM';

        const data = await client.splitgate.getRaceTimes(user.splitgateId, platform);

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
    }
}

export default new RaceTimesCommand;