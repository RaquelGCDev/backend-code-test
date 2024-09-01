import Genially from "./Genially";
import GeniallyId from "./value-object/GeniallyId";

interface GeniallyRepository {
  save(genially: Genially): Promise<void>;

  find(id: GeniallyId): Promise<Genially>;

  delete(id: GeniallyId): Promise<void>;
}

export default GeniallyRepository;
