import Genially from "../domain/Genially";
import GeniallyId from "../domain/value-object/GeniallyId";
import GeniallyRepository from "../domain/GeniallyRepository";

export default class InMemoryGeniallyRepository implements GeniallyRepository {
  private geniallys : Genially[] = [];

  async save(genially: Genially): Promise<void> {
    await this.delete(genially.id);
    this.geniallys.push(genially);
  }

  async find(id: GeniallyId): Promise<Genially> {
    return this.geniallys.find((genially) => genially.id.value === id.value);
  }

  async delete(id: GeniallyId): Promise<void> {
    this.geniallys = this.geniallys.filter((genially) => genially.id !== id);
  }
}
