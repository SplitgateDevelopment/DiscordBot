import Bot from '../Bot';
import path from 'path';
import { readdirSync } from 'fs';
import SlashCommand from '../util/structures/SlashCommand';

async function handle(client: Bot): Promise<void> {
    const slashPath = path.join(__dirname, '..', 'commands', 'slash');
    const categories = await readdirSync(slashPath);
    for (const category of categories) {
        const files = await readdirSync(path.join(slashPath, category))
        .filter(file => file.endsWith('.js'));
        for (const file of files) {
            const { default: command } = await import(path.join(slashPath, category, file)) as { default: SlashCommand };
            command.category = category;
            
            client.slashCommands.set(command.name, command);
            client.logger.info(`Loaded slash command: ${command.name} ${command.private ? '🔒': '🌐'} (/)`);
        }
    }
    await client.registerSlash();
}

export default handle;