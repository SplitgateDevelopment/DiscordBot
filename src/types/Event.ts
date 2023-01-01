import Bot from '../Bot';

type EventOptions = {
    name: string;
    once?: boolean;
    run?: EventFunction;
};

interface IEvent {
    name: string;
    once: boolean;
    run: EventFunction;
}

type EventFunction = (client: Bot, ...args: any[]) => void;

export {
    IEvent,
    EventOptions,
    EventFunction
};