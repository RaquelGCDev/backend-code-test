import { describe, it, expect, vi, beforeEach } from 'vitest';

import GeniallyRepository from "../../src/contexts/core/genially/domain/GeniallyRepository";
import Genially from "../../src/contexts/core/genially/domain/Genially";
import DeleteGeniallyService from "../../src/contexts/core/genially/application/DeleteGeniallyService";
import GeniallyId from "../../src/contexts/core/genially/domain/value-object/GeniallyId";
import GeniallyName from "../../src/contexts/core/genially/domain/value-object/GeniallyName";
import GeniallyDescription from "../../src/contexts/core/genially/domain/value-object/GeniallyDescription";

describe('DeleteGeniallyService', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    it('should rename an existing Genially', async () => {
        const id = "8ad2afab-a6bc-43ed-85c0-2107183e2119";
        const name = "aName";
        const description = "aDescription";
        const existingGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));
        const expectedGenially = Genially.create(new GeniallyId(id), new GeniallyName(name), new GeniallyDescription(description));
        expectedGenially.delete();

        const geniallyRepository: GeniallyRepository = {
            save: vi.fn().mockReturnValue(expectedGenially),
            find: vi.fn().mockReturnValue(existingGenially),
            delete: vi.fn()
        };
        const deleteGeniallyService = new DeleteGeniallyService(geniallyRepository);
        await deleteGeniallyService.execute(id);

        expect(geniallyRepository.save).toHaveBeenCalledWith(expectedGenially);
    });
});