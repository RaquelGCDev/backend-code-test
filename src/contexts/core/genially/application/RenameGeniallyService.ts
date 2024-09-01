import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import GeniallyId from "../domain/value-object/GeniallyId";
import GeniallyName from "../domain/value-object/GeniallyName";

type RenameGeniallyServiceRequest = {
  name: string;
};


export default class RenameGeniallyService {
  constructor(private repository: GeniallyRepository) {}


  public async execute(id: string, req : RenameGeniallyServiceRequest): Promise<void> {
    const genially = await this.repository.find(new GeniallyId(id));

    const renamedGenially = new Genially(genially.id, new GeniallyName(req.name), genially.description);

    await this.repository.save(renamedGenially);
  }
}
