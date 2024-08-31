import { Response, Request } from "express";
import CreateGeniallyService from "../../contexts/core/genially/application/CreateGeniallyService";
import InMemoryGeniallyRepository from "../../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";



const repository = new InMemoryGeniallyRepository();

export const postGenially = async (req: Request, res: Response) => {
    const geniallyCreator = new CreateGeniallyService(repository);

    const genially = await geniallyCreator.execute(req.body);

    res.status(201).send(genially);
};
