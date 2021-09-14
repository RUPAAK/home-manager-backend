import request from "supertest";
import { app } from "../../../../app";
import "../../../../test/setup";

it("should not throw 404 while calling create endpoint", async () => {
    const res = await request(app).post("/api/v1/expense").send({});
    expect(res.status).not.toEqual(404);
});

it("should throw 401 error if token isnot provided", async () => {
    await request(app).post("/api/v1/expense")
    .send({})
    .expect(401)
});

it("should throw 401 error if token is invalid", async () => {
    await request(app).post("/api/v1/expense")
    .set({
        Authorization: "fjdsafdi"
    })
    .send({})
    .expect(401)
});

it("should throw 400 error if title isnot provided", async () => {
    const token= await global.signin()
    
    const res= await request(app).post("/api/v1/expense")
    .set({
        Authorization: `Bearer ${token}`
    })
    .send({})
    .expect(400)
});

it("should throw 400 error if amount isnot provided", async () => {
    const token= await global.signin()

    await request(app).post("/api/v1/expense")
    .set({
        Authorization: `Bearer ${token}`
    })
    .send({})
    .expect(400)
});


it("should throw 400 error if title length is less than 6", async () => {
    const token= await global.signin()

    await request(app).post("/api/v1/expense")
    .set({
        Authorization: `Bearer ${token}`
    })
    .send({
        title: "one",
        amount: 5000,
    })
    .expect(400)
});

it("shouldthrow 201 if data created successfull", async () => {
    const token= await global.signin()

    await request(app).post("/api/v1/expense")
    .set({
        Authorization: `Bearer ${token}`
    })
    .send({
        title: "This is length",
        amount: 5000,
    })
    .expect(201)
});

it("should throw 201 and should have data if data created successfull", async () => {
    const token= await global.signin()

    const res= await request(app).post("/api/v1/expense")
    .set({
        Authorization: `Bearer ${token}`
    })
    .send({
        title: "This is length",
        amount: 5000,
    })
    .expect(201)
    expect(res.body.data).toBeDefined()
});



