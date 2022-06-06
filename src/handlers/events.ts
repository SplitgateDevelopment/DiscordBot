import Bot from '../Bot';
import path from 'path';
import { readdirSync } from 'fs';
import Event from '../util/structures/Event';

function handle(client: Bot): void {
    const eventPath = path.join(__dirname, '..', 'events');
    readdirSync(eventPath)
    .filter(file => file.endsWith('.js'))
    .forEach(async (file) => {
        const { default: event } = await import(`${eventPath}/${file}`) as { default: Event };
        const name: string = event.name || file.replace('.js', '');

        client.events.set(name, event);
        if (event.once) client.once(name, (...args) => event.run(client, ...args));
        else client.on(name, (...args) => event.run(client, ...args));

        client.logger.info(`Loaded event "${name}" 🚨`);
    });
}

export default handle;