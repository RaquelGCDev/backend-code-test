import { test, expect } from 'vitest';
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
