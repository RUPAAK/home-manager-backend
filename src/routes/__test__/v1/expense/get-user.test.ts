import request from "supertest";
import { app } from "../../../../app";
import "../../../../test/setup";

it("should not throw 404 while calling get endpoint", async () => {
    // const res = await request(app).get("/api/v1/expenses/userexpense").send({});
    // expect(res.status).not.toEqual(404);
});

it("should throw 401 not authorized if token invalid", async () => {    
    await request(app).get("/api/v1/expenses/userexpense")
        .set({
            Authorization: `Bearer token`
        })
        .send()
        .expect(401)
});

it("should throw data while calling get endpoint", async () => {
    const token= await global.signin()
    
    const res= await request(app).get("/api/v1/expenses/userexpense")
        .set({
            Authorization: `Bearer ${token}`
        })
    .expect(200)
    expect(res.body.data).toBeDefined()
});

it("should throw data only of the user", async () => {
    const token= await global.signin()

    const res= await request(app).post("/api/v1/expenses")
    .set({
        Authorization: `Bearer ${token}`
    })
    .send({
        name: "This is length",
        amount: 5000,
        date: '2057/11/11'
    })
    .expect(201)
    
    const res2= await request(app).get("/api/v1/expenses/userexpense")
        .set({
            Authorization: `Bearer ${token}`
        })
    .expect(200)
    expect(res2.body.data[0].user).toEqual(res.body.data.user)
});