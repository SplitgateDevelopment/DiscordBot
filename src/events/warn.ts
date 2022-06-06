import Bot from '../Bot';
import Event from '../util/structures/Event';

export default new Event({
    name: 'warn',
    once: true,
    run: async (client: Bot, warning: string) => {
        client.logger.warn(warning);
    }
});