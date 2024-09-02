import {DomainEvent} from "../../../shared/domain/DomainEvent";

type GeniallyCreatedDomainEventAttributes = {
    readonly total: number;
    readonly description: string;
}

export class GeniallyCreatedDomainEvent extends DomainEvent {
    static readonly eventName = "genially_counter.incremented";

    readonly total: number;
    readonly description: string;

    constructor(data: { aggregateId: string; total: number; description: string; eventId?: string; occurredOn?: Date }) {
        const { aggregateId, total, description, eventId, occurredOn } = data;
        super({ eventName: GeniallyCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
        this.total = total;
        this.description = description;
    }

    public toPrimitives(): GeniallyCreatedDomainEventAttributes {
        const { total, description } = this;
        return {
            total,
            description
        }
    }
}