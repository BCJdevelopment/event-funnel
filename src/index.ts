class EventFunnel {

    private listeners: {
        [eventName: string]: {
            handler: (payload: any) => void,
            id: number
        }[]
    } = { }

    private listenerId: number = 0;

    constructor() { }

    publishEvent = (eventName: string, payload: any) => {
        const listeners = this.listeners[eventName];
        if (listeners) {
            listeners.forEach(listener => {
                listener.handler(payload);
            });
        }
    }

    createEventListener = (eventName: string, handler: (payload?: any) => void): number => {
        this.listenerId += 1;
        const newListenerObject = {
            handler: (payload: any) => { setTimeout(handler, 0, payload) },
            id: this.listenerId
        }

        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(newListenerObject);

        return newListenerObject.id;
    }

    destroyEventListener = (eventName: string, listenerId: number) => {
        if (this.listeners[eventName]) {
            let index = this.listeners[eventName].findIndex(listener => listener.id === listenerId);
            if (index > -1) {
                this.listeners[eventName].splice(index, 1);
                return true;
            }
        }
        return false;
    }
}

const eventFunnel = new EventFunnel();

export const publishEvent = eventFunnel.publishEvent.bind(eventFunnel);
export const createEventListener = eventFunnel.createEventListener.bind(eventFunnel);
export const destroyEventListener = eventFunnel.destroyEventListener.bind(eventFunnel);

export default eventFunnel;