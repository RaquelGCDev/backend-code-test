import {DomainEventClass} from "../../../../shared/domain/DomainEvent";
import {DomainEventSubscriber} from "../../../../shared/domain/DomainEventSubscriber";
import {GeniallyCreatedDomainEvent} from "../../../genially/domain/GeniallyCreatedDomainEvent";
import GeniallyId from "../../../genially/domain/value-object/GeniallyId";
import { CounterIncrementer } from './CounterIncrementer';

export class IncrementCounterOnGeniallyCreated implements DomainEventSubscriber<GeniallyCreatedDomainEvent> {
  constructor(private incrementer: CounterIncrementer) {}

  subscribedTo(): DomainEventClass[] {
    return [GeniallyCreatedDomainEvent];
  }

  async on(domainEvent: GeniallyCreatedDomainEvent) {
    await this.incrementer.run(new GeniallyId(domainEvent.aggregateId));
  }
}
