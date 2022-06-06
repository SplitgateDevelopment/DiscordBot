import { Message } from 'discord.js';
import Bot from '../Bot';
import Event from '../util/structures/Event';

export default new Event({
    name: 'messageCreate',
    run: async (client: Bot, message: Message) => {
        if (message.author.bot) return;

        const prefix = client.config.prefix.toLowerCase();
        const content = message.content.toLowerCase();
        if (!content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g) || [];
        const cmd = args?.shift()?.toLowerCase() || '';
        if (cmd.length == 0) return;

        const command = client.commands.get(cmd);
        if (!command) return;

        if (command.ownerOnly && !client.config.dev.ids.includes(message.author.id)) return message.channel.send('> This command is only for the bot owner.');
        try {
            command.run(client, message, args);
        }
        catch(error) {
            message.channel.send(`> An error occured while running the command: ${error}`);
        }
    }
});