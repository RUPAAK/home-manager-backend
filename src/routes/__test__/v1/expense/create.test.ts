import request from "supertest";
import { app } from "../../../../app";
import "../../../../test/setup";

it("should not throw 404 while calling create endpoint", async () => {
    const res = await request(app).post("/api/v1/expenses").send({});
    expect(res.status).not.toEqual(404);
});

it("should throw 401 error if token isnot provided", async () => {
    await request(app).post("/api/v1/expenses")
    .send({})
    .expect(401)
});

it("should throw 401 error if token is invalid", async () => {
    await request(app).post("/api/v1/expenses")
    .set({
        Authorization: "fjdsafdi"
    })
    .send({})
    .expect(401)
});

it("should throw 400 error if name isnot provided", async () => {
    const token= await global.signin()
    
    const res= await request(app).post("/api/v1/expenses")
    .set({
        Authorization: `Bearer ${token}`
    })
    .send({
        name: '',
        amount: 5000,
        date: '2057/11/11'
    })
    .expect(400)
});

it("should throw 400 error if amount isnot provided", async () => {
    const token= await global.signin()

    await request(app).post("/api/v1/expenses")
    .set({
        Authorization: `Bearer ${token}`
    })
    .send({
        name: 'this is the length',
        date: '2057/11/11'
    })
    .expect(400)
});


it("should throw 400 error if date is absent", async () => {
    const token= await global.signin()

    await request(app).post("/api/v1/expenses")
    .set({
        Authorization: `Bearer ${token}`
    })
    .send({
        name: "one",
        amount: 5000,
    })
    .expect(400)
});

it("shouldthrow 201 if data created successfull", async () => {
    const token= await global.signin()

    await request(app).post("/api/v1/expenses")
    .set({
        Authorization: `Bearer ${token}`
    })
    .send({
        name: "This is length",
        amount: 5000,
        date: '2057/11/11'
    })
    .expect(201)

});

it("should throw 201 and should have data if data created successfull", async () => {
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
    expect(res.body.data).toBeDefined()
});
