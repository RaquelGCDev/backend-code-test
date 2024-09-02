import { EventEmitter } from "events";
import {DomainEvent} from "../../../shared/domain/DomainEvent";
import {DomainEventSubscriber} from "../../../shared/domain/DomainEventSubscriber";
import {EventBus} from "../../../shared/domain/EventBus";

export class InMemoryAsyncEventBus extends EventEmitter implements EventBus {
    async publish(events: DomainEvent[]): Promise<void> {
        events.map(event => this.emit(event.eventName, event));
    }

    addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>) {
        subscribers.forEach(subscriber => {
            subscriber.subscribedTo().forEach(event => {
                this.on(event.EVENT_NAME, subscriber.on.bind(subscriber));
            });
        });
    }
}