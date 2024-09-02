import { Response, Request } from "express";
import CreateGeniallyService from "../../contexts/core/genially/application/CreateGeniallyService";
import RenameGeniallyService from "../../contexts/core/genially/application/RenameGeniallyService";
import DeleteGeniallyService from "../../contexts/core/genially/application/DeleteGeniallyService";
import InMemoryGeniallyRepository from "../../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";
import {InMemoryAsyncEventBus} from "../../contexts/core/counter/infrastructure/InMemoryAsyncEventBus";

const repository = new InMemoryGeniallyRepository();
const eventBus = new InMemoryAsyncEventBus();

export const postGenially = async (req: Request, res: Response) => {
    const geniallyCreator = new CreateGeniallyService(repository,eventBus);

    const genially = await geniallyCreator.execute(req.body);

    res.status(201).send(genially);
};

export const putGenially = async (req: Request, res: Response) => {
    const { id } = req.params;
    const renameGeniallyService = new RenameGeniallyService(repository);

    const genially = await renameGeniallyService.execute(id, req.body);

    res.status(204).send(genially);
};

export const deleteGenially = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleteGeniallyService = new DeleteGeniallyService(repository);
    await deleteGeniallyService.execute(id);
    res.status(204).send();
};
