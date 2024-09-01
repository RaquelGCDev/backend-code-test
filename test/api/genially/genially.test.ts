import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from "../../../src/api/app";


describe("POST to create a new genially", () => {
    it("Should get 201 response code", async () => {
        const newGenially = { id: "241acde9-08fc-49d3-a8a8-f68614f3afb9", name: "aName", description: "aDesc" };
        const response = await request(app)
            .post("/genially")
            .send(newGenially);
        expect(response.status).toBe(201);
    });
});

describe("PUT to rename an existing genially", () => {
    it("Should return 204 response code", async () => {
        await request(app)
            .post("/genially")
            .send({ id: "e2dedd4e-1a02-4af2-9158-fd55261795f3", name: "aName", description: "aDescription" });

        const response = await request(app)
            .put("/genially/e2dedd4e-1a02-4af2-9158-fd55261795f3")
            .send({ name: "aNewName" });

        expect(response.status).toEqual(204);
    });
});

describe("DELETE to softly remove an existing genially", () => {
    it("Should return 204 response code", async () => {
        await request(app)
            .post("/genially")
            .send({ id: "0f9241b4-366a-40a1-b511-4866a9aafa6f", name: "aName", description: "aDescription" });

        const response = await request(app)
            .delete("/genially/0f9241b4-366a-40a1-b511-4866a9aafa6f")
            .send();

        expect(response.status).toEqual(204);
    });
});
