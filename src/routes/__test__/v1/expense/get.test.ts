import request from "supertest";
import { app } from "../../../../app";
import "../../../../test/setup";

it("should not throw 404 while calling get endpoint", async () => {
    const res = await request(app).get("/api/v1/expenses").send({});
    expect(res.status).not.toEqual(404);
});

it("should not throw 401 not authorized if token invalid", async () => {    
    const res= await request(app).get("/api/v1/expenses")
        .set({
            Authorization: `Bearer token`
        })
    .expect(401)
});

it("should throw data while calling get endpoint", async () => {
    const token= await global.signin()
    
    const res= await request(app).get("/api/v1/expenses")
        .set({
            Authorization: `Bearer ${token}`
        })
    .expect(200)
    expect(res.body.data).toBeDefined()
});