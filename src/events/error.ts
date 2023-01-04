import Bot from '../Bot';
import Event from '../util/structures/Event';

class ErrorEvent extends Event {
    constructor() {
        super({
            name: 'error',
            once: true,
        })
    }

    async run (client: Bot, error: Error) {
        client.logger.error(error.message);
    }
}

export default new ErrorEvent;