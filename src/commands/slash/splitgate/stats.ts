import { CommandInteraction, EmbedBuilder } from 'discord.js';
import Bot from '../../../Bot';
import { IUser } from '../../../types/User';
import SlashCommand from '../../../util/structures/SlashCommand';

class StatsCommand extends SlashCommand {
    constructor() {
        super({
            name: 'stats',
            description: 'Retrieve user\'s statistics',
            options: [
                {
                    name: 'userid',
                    description: 'The user identifier to search for',
                    type: 3,
                }
            ]
        })
    }
    async run (client: Bot, interaction: CommandInteraction, user: IUser) {

        const data = await client.splitgate.getStats([user.splitgateId]);
        const stats = data[user.splitgateId || '']?.totalStats?.commonStats?.stats;
        
        const { codeBlock } = client.utils;
        const embed = new EmbedBuilder()
        .setTitle('Splitgate Stats 🌀')
        .setColor('#add8e6')
        .addFields([{
                name: '**❯ Kills:**',
                value: codeBlock(stats?.kills),
                inline: true,
            },
            {
                name: '**❯ Deaths:**',
                value: codeBlock(stats?.deaths),
                inline: true,
            },
            {
                name: '**❯ KD:**',
                value: codeBlock(stats?.kdRatio?.toString().slice(0, 5)),
                inline: true,
            },
            {
                name: '**❯ Accuracy:**',
                value: codeBlock(`${((stats?.accuracy || 0)*100).toString().slice(0, 5)}%`),
                inline: true,
            },
            {
                name: '**❯ Headshot Kills:**',
                value: codeBlock(stats?.headshotKills),
                inline: true,
            },
            {
                name: '**❯ Melee Kills:**',
                value: codeBlock(stats?.meleeKills),
                inline: true,
            },
            {
                name: '**❯ Assists:**',
                value: codeBlock(stats?.assists),
                inline: true,
            },
            {
                name: '**❯ Damage Dealt:**',
                value: codeBlock(stats?.damageDealt),
                inline: true,
            },
            {
                name: '**❯ Teabags:**',
                value: codeBlock(stats?.teabags),
                inline: true,
            },
        ])
        .setTimestamp(Date.now());

        interaction.reply({
            embeds: [embed]
        });
    }
}

export default new StatsCommand;