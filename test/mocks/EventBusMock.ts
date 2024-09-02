import {DomainEvent} from "../../src/contexts/shared/domain/DomainEvent";
import {DomainEventSubscriber} from "../../src/contexts/shared/domain/DomainEventSubscriber";
import {EventBus} from "../../src/contexts/shared/domain/EventBus";
import {vi, expect} from "vitest";

export class EventBusMock implements EventBus {

    private publishMock = vi.fn();

    async publish(events: DomainEvent[]): Promise<void> {
        this.publishMock(events);
    }

    assertLastPublishedEventIs(expectedEvent: DomainEvent) {
        const publishSpyCalls = this.publishMock.mock.calls;

        expect(publishSpyCalls.length).toBeGreaterThan(0);

        const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1];
        const lastPublishedEvent = lastPublishSpyCall[0][0];

        const expected = this.getDataFromDomainEvent(expectedEvent);
        const published = this.getDataFromDomainEvent(lastPublishedEvent);

        expect(expected).toMatchObject(published);
    }

    private getDataFromDomainEvent(event: DomainEvent) {
        const { eventId, occurredOn, ...attributes } = event;

        return attributes;
    }

    addSubscribers(subscribers: DomainEventSubscriber<DomainEvent>[]): void {
    }


}