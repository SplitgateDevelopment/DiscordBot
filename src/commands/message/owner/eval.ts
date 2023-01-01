import Command from '../../../util/structures/Command';
import { inspect } from 'util';
import { EmbedBuilder } from 'discord.js';

export default new Command({
    name: 'eval',
    description: 'Evaluates code',
    ownerOnly: true,
    run: async (client, message, args) => {
        let embed = new EmbedBuilder()
        .setTitle('Evaluating...')
        .setColor([0, 0, 255]);

        const msg = await message.channel.send({
            embeds: [embed]
        });

        try {
            const data = await eval(args.join(' ').replace(/```/g, ''));
            let output = data;
            if (typeof data !== 'string') {
                output = inspect(data);	
            }

            embed = new EmbedBuilder()
            .setTitle('Evaluated')
            .setColor([0, 255, 0])
            .setDescription(`\`\`\`js\n${output}\n\`\`\``);

            return await msg.edit({
                embeds: [embed]
            });
        } catch (error) {
            embed = new EmbedBuilder()
            .setTitle('An error occured')
            .setColor([255, 0, 0])
            .setDescription(`\`\`\`js\n${error}\n\`\`\``);

            return await msg.edit({
                embeds: [embed]
            });
        }
    }
});