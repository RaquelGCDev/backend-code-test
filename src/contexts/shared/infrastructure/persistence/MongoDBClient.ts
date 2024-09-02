import { MongoClient, Db } from "mongodb";

export default class MongoDBClient {
    private static connection: MongoClient;

    private async getConnection(): Promise<MongoClient> {
        if (MongoDBClient.connection == undefined) {
            MongoDBClient.connection = await MongoClient.connect(this.getConnectionUrl());
        }
        return MongoDBClient.connection;
    }

    public async db(): Promise<Db> {
        return await (await this.getConnection()).db(process.env.VITE_MONGODB_DATABASE);
    }

    private getConnectionUrl(): string {
        const host = process.env.VITE_MONGODB_HOST;
        const port = process.env.VITE_MONGODB_PORT;
        const username = process.env.VITE_MONGODB_USERNAME;
        const password = process.env.VITE_MONGODB_PASSWORD;

        return `mongodb://${username}:${password}@${host}:${port}`;
    }


}