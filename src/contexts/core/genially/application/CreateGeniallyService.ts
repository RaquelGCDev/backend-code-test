import {EventBus} from "../../../shared/domain/EventBus";
import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import GeniallyId from "../domain/value-object/GeniallyId";
import GeniallyName from "../domain/value-object/GeniallyName";
import GeniallyDescription from "../domain/value-object/GeniallyDescription";

type CreateGeniallyServiceRequest = {
  id: string;
  name: string;
  description: string;
};

export default class CreateGeniallyService {
  constructor(private repository: GeniallyRepository, private readonly eventBus: EventBus) {}

  public async execute(req: CreateGeniallyServiceRequest): Promise<void> {
    const id = new GeniallyId(req.id);
    const genially = Genially.create(
        id,
        new GeniallyName(req.name),
        new GeniallyDescription(req.description)
    );
    await this.repository.save(genially);
    await this.eventBus.publish(genially.pullDomainEvents());
  }
}
