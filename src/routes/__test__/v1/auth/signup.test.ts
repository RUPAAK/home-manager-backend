import request from "supertest";
import { app } from "../../../../app";
import "../../../../test/setup";

it('should not throw 404 when hitting signup endpoint', async()=>{
    const res = await request(app).post("/api/v1/auth/signup").send({});
    expect(res.status).not.toEqual(404)
})