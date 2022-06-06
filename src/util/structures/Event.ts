import { EventFunction, EventOptions } from '../../types/Event';

class Event {
    name: string;
    once: boolean;
    run: EventFunction;
    constructor(options: EventOptions) {
        this.name = options.name;
        this.once = options.once || false;
        this.run = options.run;
    }
}

export default Event;