import SlashCommand from '../../../util/structures/SlashCommand';
import { inspect } from 'util';
import { CommandInteraction, EmbedBuilder } from 'discord.js';
import Bot from '../../../Bot';

class EvalCommand extends SlashCommand {
    constructor() {
        super({
            name: 'eval',
            description: 'Evaluate code',
            options: [
                {
                    name: 'code',
                    description: 'The code to evaluate',
                    type: 3,
                    required: true,
                }
            ],
            private: true,
        })
    }
    
    async run (client: Bot, interaction: CommandInteraction) {
        const input = interaction.options.get('code');
        const code = input?.value?.toString() || '';

        let embed;
        try {
            const data = await eval(code);
            let output = data;
            if (typeof data !== 'string') {
                output = inspect(data);	
            }

            embed = new EmbedBuilder()
            .setTitle('Evaluated!')
            .setColor('#00ff00')
            .setDescription(`\`\`\`js\n${output}\n\`\`\``);
            
            interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
        } catch (e) {
            embed = new EmbedBuilder()
            .setTitle('An error occured')
            .setColor('#ff0000')
            .setDescription(`\`\`\`js\n${e}\n\`\`\``);

            interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
        }
    }
}

export default new EvalCommand;