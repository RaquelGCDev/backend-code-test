import { Filter } from "mongodb";
import MongoDBClient from "../../../shared/infrastructure/persistence/MongoDBClient";
import Genially, {GeniallyPrimitives} from "../domain/Genially";
import GeniallyId from "../domain/value-object/GeniallyId";
import GeniallyRepository from "../domain/GeniallyRepository";

interface GeniallyDocument{
    _id: string;
    name: string;
    description: string;
    createdAt: Date;
    modifiedAt: Date;
    deletedAt?: Date;
}

export default class MongoDBGeniallyRepository implements GeniallyRepository {

    private collection = "genially";

    async save(genially: Genially): Promise<void> {
        const id = genially.id;
        const db = await new MongoDBClient().db();
        const document = { ...genially.toPrimitives(), _id: id };
        await db.collection(this.collection).updateOne({ _id: id }, { $set: document }, { upsert: true });
    }

    async update(genially: Genially): Promise<void> {
        genially.update();
        await this.save(genially);
    }

    async find(id: GeniallyId): Promise<Genially> {
        const db = await new MongoDBClient().db();
        const document = await db.collection(this.collection).findOne<GeniallyPrimitives>({ _id: id }, {});


        return document ? Genially.fromPrimitives({
            id: id.value,
            name: document.name,
            description: document.description,
            createdAt: document.createdAt,
            modifiedAt: document.modifiedAt,
            deletedAt: document.deletedAt
        }) : null;
    }

    async delete(id: GeniallyId): Promise<void> {
        const genially = await this.find(id);
        genially.delete();
        await this.save(genially);
    }
}