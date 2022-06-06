import Bot from '../Bot';
import path from 'path';
import { readdirSync } from 'fs';
import Command from '../util/structures/Command';

async function handle(client: Bot): Promise<void> {
    const commandsPath = path.join(__dirname, '..', 'commands', 'message');
    readdirSync(commandsPath)
    .forEach(category => {
        readdirSync(path.join(commandsPath, category))
        .filter(file => file.endsWith('.js'))
        .forEach(async (file) => {
            const { default: command } = await import(path.join(commandsPath, category, file)) as { default: Command };
            client.commands.set(command.name, command);
            client.logger.info(`Registered command ${command.name} 💬`);
        });
    });
}

export default handle;