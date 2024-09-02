import {describe, expect, it} from "vitest";
import Genially from "../../src/contexts/core/genially/domain/Genially";
import GeniallyId from "../../src/contexts/core/genially/domain/value-object/GeniallyId";
import GeniallyName from "../../src/contexts/core/genially/domain/value-object/GeniallyName";
import GeniallyDescription from "../../src/contexts/core/genially/domain/value-object/GeniallyDescription";
import MongoDBGeniallyRepository from "../../src/contexts/core/genially/infrastructure/MongoDBGeniallyRepository";


describe("MongoDBGeniallyRepository", () => {
    it("should save a new genially", async () => {
        const id = "b71c27f9-17bc-48dd-acbd-b4317151aed0";
        const expectedGenially = Genially.create(new GeniallyId(id), new GeniallyName("aName"), new GeniallyDescription("aDescription"));
        const mongoRepository = new MongoDBGeniallyRepository();

        await mongoRepository.save(expectedGenially);

        const genially = await mongoRepository.find(new GeniallyId(id));
        expect(genially.toPrimitives()).toEqual(expectedGenially.toPrimitives());
    });

});