import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import GeniallyId from "../domain/value-object/GeniallyId";
import GeniallyName from "../domain/value-object/GeniallyName";

export default class DeleteGeniallyService {
  constructor(private repository: GeniallyRepository) {}


  public async execute(id: string): Promise<void> {
    const genially = await this.repository.find(new GeniallyId(id));

    const removedGenially = new Genially(genially.id, genially.name , genially.description);
    removedGenially.delete();
    await this.repository.save(removedGenially);
  }
}
