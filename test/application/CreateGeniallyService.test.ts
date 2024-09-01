import { describe, it, expect, vi } from 'vitest';

import Genially from "../../src/contexts/core/genially/domain/Genially";
import CreateGeniallyService from "../../src/contexts/core/genially/application/CreateGeniallyService";
import GeniallyId from "../../src/contexts/core/genially/domain/value-object/GeniallyId";
import GeniallyName from "../../src/contexts/core/genially/domain/value-object/GeniallyName";
import GeniallyDescription from "../../src/contexts/core/genially/domain/value-object/GeniallyDescription";
import {DescriptionLengthExceeded} from "../../src/contexts/core/genially/domain/DescriptionLengthExceeded";
import {NameLengthNotValid} from "../../src/contexts/core/genially/domain/NameLengthNotValid";
import InMemoryGeniallyRepository from "../../src/contexts/core/genially/infrastructure/InMemoryGeniallyRepository";

describe('CreateGeniallyService', () => {
    it('should create a new record', async () => {
        // Mock the repository
        const geniallyRepository = vi.mocked(new InMemoryGeniallyRepository());
        const mockSave = vi.spyOn(geniallyRepository, 'save');

        const id = "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7";
        const name = "aName";
        const description = "aDescription";
        const expectedGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));


        const createGeniallyService = new CreateGeniallyService(geniallyRepository);
        await createGeniallyService.execute({id, name, description});

        expect(mockSave).toHaveBeenCalledWith(expectedGenially);

        // Restore the original method after the test
        mockSave.mockRestore();
    });

    it('should throw an error for names with less than 3 characters', async () => {
        expect(() => {
            const geniallyRepository = vi.mocked(new InMemoryGeniallyRepository());
            const mockSave = vi.spyOn(geniallyRepository, 'save');

            const id = "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7";
            const name = "a";
            const description = "aDescription";
            const expectedGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));


            const createGeniallyService = new CreateGeniallyService(geniallyRepository);
            createGeniallyService.execute({id, name, description});

            expect(mockSave).toHaveBeenCalledWith(expectedGenially);

            // Restore the original method after the test
            mockSave.mockRestore();
        }).toThrow(NameLengthNotValid);
    });

    it('should throw an error for descriptions with more than 125 characters', async () => {
        expect(() => {
            const geniallyRepository = vi.mocked(new InMemoryGeniallyRepository());
            const mockSave = vi.spyOn(geniallyRepository, 'save');

            const id = "d25bc90b-8b2b-4e18-b6aa-929330b5f6a7";
            const name = "aName";
            const description = "aDescription".repeat(50);
            const expectedGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));


            const createGeniallyService = new CreateGeniallyService(geniallyRepository);
            createGeniallyService.execute({id, name, description});

            expect(mockSave).toHaveBeenCalledWith(expectedGenially);

            // Restore the original method after the test
            mockSave.mockRestore();
        }).toThrow(DescriptionLengthExceeded);
    });
});