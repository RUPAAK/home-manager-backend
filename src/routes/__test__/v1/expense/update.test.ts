import request from "supertest";
import { app } from "../../../../app";
import "../../../../test/setup";

it("should not throw 404 while calling get endpoint", async () => {
    const res = await request(app).patch("/api/v1/expenses/4edd40c86762e0fb12000003").send({});
    expect(res.status).not.toEqual(404);
});

it("should throw 401 if token not given", async () => {    
    const res= await request(app).patch("/api/v1/expenses/4edd40c86762e0fb12000003")
        .set({
            Authorization: `Bearer token`
        })
    .expect(401)
});

it("should throw 400 if expense not found", async () => {   
    const token= await global.signin() 
    const res= await request(app).patch("/api/v1/expenses/4edd40c86762e0fb12000003")
        .set({
            Authorization: `Bearer ${token}`
        })
    .expect(400)
});

it("should throw 200 and successfully update expense", async () => {   
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

    const updateRes= await request(app).patch(`/api/v1/expenses/${res.body.data.id}`)
        .set({
            Authorization: `Bearer ${token}`
        })
        .send({
            name: "hello",
            amount: 500,
        })
    .expect(200)
    expect(updateRes.body.data.name).toEqual('hello')
    expect(updateRes.body.data.amount).toEqual(500)
});