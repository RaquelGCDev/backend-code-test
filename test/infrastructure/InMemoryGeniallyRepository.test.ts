import { describe, it, expect } from 'vitest';
import Genially from "../../src/contexts/core/genially/domain/Genially";
import GeniallyDescription from "../../src/contexts/core/genially/domain/value-object/GeniallyDescription";
import GeniallyId from "../../src/contexts/core/genially/domain/value-object/GeniallyId";
import GeniallyName from "../../src/contexts/core/genially/domain/value-object/GeniallyName";
import InMemoryGeniallyRepository from "../../src/contexts/core/genially/infrastructure/InMemoryGeniallyRepository";

describe('GeniallyRepository', () => {
    describe('#save', () => {
        it('should be able to persist a new genially', async () => {
            const expectedGenially = Genially.create(new GeniallyId("b74039d9-f15f-40aa-b168-c4ebb9b31248"), new GeniallyName("aName"), new GeniallyDescription("aDescription"));
            const inMemoryRepository = new InMemoryGeniallyRepository();

            await inMemoryRepository.save(expectedGenially);

            const genially = await inMemoryRepository.find(new GeniallyId("b74039d9-f15f-40aa-b168-c4ebb9b31248"));
            expect(genially).toEqual(expectedGenially);
        });
    });

    describe('#find', () => {
        it('should return the correct genially', async () => {
            const expectedGenially = Genially.create(new GeniallyId("b74039d9-f15f-40aa-b168-c4ebb9b31248"), new GeniallyName("aName"), new GeniallyDescription("aDescription"));
            const anotherExpectedGenially = Genially.create(new GeniallyId("70c47cb4-cc88-4f8a-932e-3adf7abb2b2e"), new GeniallyName("otherName"), new GeniallyDescription("otherDescription"));
            const inMemoryRepository = new InMemoryGeniallyRepository();

            await inMemoryRepository.save(expectedGenially);
            await inMemoryRepository.save(anotherExpectedGenially);

            const genially = await inMemoryRepository.find(new GeniallyId("b74039d9-f15f-40aa-b168-c4ebb9b31248"));
            const anotherGenially = await inMemoryRepository.find(new GeniallyId("70c47cb4-cc88-4f8a-932e-3adf7abb2b2e"));

            expect(genially).toEqual(expectedGenially);
            expect(anotherGenially).toEqual(anotherExpectedGenially);
        });
    });
});
