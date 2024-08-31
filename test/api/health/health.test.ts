import request from "supertest";
import app from "../../../src/api/app";


describe('Health', () => {
    it('Should get a 200 response', async () => {
        const response = await request(app).get('/').send();

        expect(response.statusCode).toBe(200);
    })
});

