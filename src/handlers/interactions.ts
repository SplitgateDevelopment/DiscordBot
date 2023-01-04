import Bot from '../Bot';
import path from 'path';
import { readdirSync } from 'fs';
import Interaction from '../util/structures/Interaction';

async function handle(client: Bot): Promise<void> {
    const interactionsPath = path.join(__dirname, '..', 'interactions',);
    readdirSync(interactionsPath)
    .forEach(interactionType => {
        readdirSync(path.join(interactionsPath, interactionType))
        .filter(file => file.endsWith('.js'))
        .forEach(async (file) => {
            const { default: interaction } = await import(path.join(interactionsPath, interactionType, file)) as { default: Interaction };
            client.interactions.set(interaction.customId, interaction);
            client.logger.info(`Loaded interaction ${interaction.customId} (${interactionType}) 🔤`);
        });
    });
}

export default handle;