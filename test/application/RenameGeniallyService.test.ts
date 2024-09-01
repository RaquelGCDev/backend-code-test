import { describe, it, expect, vi, beforeEach } from 'vitest';

import GeniallyRepository from "../../src/contexts/core/genially/domain/GeniallyRepository";
import Genially from "../../src/contexts/core/genially/domain/Genially";
import RenameGeniallyService from "../../src/contexts/core/genially/application/RenameGeniallyService";
import GeniallyId from "../../src/contexts/core/genially/domain/value-object/GeniallyId";
import GeniallyName from "../../src/contexts/core/genially/domain/value-object/GeniallyName";
import GeniallyDescription from "../../src/contexts/core/genially/domain/value-object/GeniallyDescription";
import {NameLengthNotValid} from "../../src/contexts/core/genially/domain/NameLengthNotValid";


describe('RenameGeniallyService', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    it('should rename an existing Genially', async () => {
        const id = "8ad2afab-a6bc-43ed-85c0-2107183e2119";
        const name = "aName";
        const description = "aDescription";
        const otherName = "someOtherName";
        const existingGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));
        const expectedGenially = Genially.create(new GeniallyId(id), new GeniallyName(otherName), new GeniallyDescription(description));
        expectedGenially.update();

        const geniallyRepository: GeniallyRepository = {
            save: vi.fn().mockReturnValue(expectedGenially),
            find: vi.fn().mockReturnValue(existingGenially),
            delete: vi.fn()
        };
        const renameGeniallyService = new RenameGeniallyService(geniallyRepository);
        await renameGeniallyService.execute(id, {name: otherName });

        expect(geniallyRepository.save).toHaveBeenCalledWith(expectedGenially);
    });

    it('should throw an error for names with less than 3 characters', async () => {
        expect(() => {
        const id = "8ad2afab-a6bc-43ed-85c0-2107183e2119";
        const name = "aName";
        const description = "aDescription";
        const otherName = "n";
        const existingGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));
        const expectedGenially = Genially.create(new GeniallyId(id), new GeniallyName(otherName), new GeniallyDescription(description));

        const geniallyRepository: GeniallyRepository = {
            save: vi.fn().mockReturnValue(expectedGenially),
            find: vi.fn().mockReturnValue(existingGenially),
            delete: vi.fn()
        };
        const renameGeniallyService = new RenameGeniallyService(geniallyRepository);
        renameGeniallyService.execute(id, {name: otherName });

        expect(geniallyRepository.find).toHaveBeenCalledWith(new GeniallyId(id));
        expect(geniallyRepository.save).toHaveBeenCalledWith(expectedGenially);
        }).toThrow(NameLengthNotValid);
    });

    it('should throw an error for names with more than 20 characters', async () => {
        expect(() => {
        const id = "8ad2afab-a6bc-43ed-85c0-2107183e2119";
        const name = "aName";
        const description = "aDescription";
        const otherName = "someOtherName".repeat(50);
        const existingGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));
        const expectedGenially = Genially.create(new GeniallyId(id), new GeniallyName(otherName), new GeniallyDescription(description));

        const geniallyRepository: GeniallyRepository = {
            save: vi.fn().mockReturnValue(expectedGenially),
            find: vi.fn().mockReturnValue(existingGenially),
            delete: vi.fn()
        };
        const renameGeniallyService = new RenameGeniallyService(geniallyRepository);
        renameGeniallyService.execute(id, {name: otherName });

        expect(geniallyRepository.find).toHaveBeenCalledWith(new GeniallyId(id));
        expect(geniallyRepository.save).toHaveBeenCalledWith(expectedGenially);
        }).toThrow(NameLengthNotValid);
    });

});