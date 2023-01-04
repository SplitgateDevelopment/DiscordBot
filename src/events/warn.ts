import Bot from '../Bot';
import Event from '../util/structures/Event';

class WarnEvent extends Event {
    constructor() {
        super({
            name: 'warn',
        });
    }

    async run(client: Bot, warning: string) {
        client.logger.warn(warning);
    }
}

export default new WarnEvent;