import Bot from '../Bot';
import Event from '../util/structures/Event';

export default new Event({
    name: 'error',
    once: true,
    run: async (client: Bot, error: Error) => {
        client.logger.error(error.message);
    }
});