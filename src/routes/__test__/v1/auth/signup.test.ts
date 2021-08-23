import request from "supertest";
import { app } from "../../../../app";
import { User } from "../../../../models/user";
import "../../../../test/setup";

it('should not throw 404 when hitting signup endpoint', async()=>{
    const res = await request(app).post("/api/v1/auth/signup").send({});
    expect(res.status).not.toEqual(404)
})

it('should throw 400 status when name is empty', async()=>{
    await request(app).post("/api/v1/auth/signup").send({
        email: "teet@gmail.com",
        password: "test"
    }).expect(400)
})

it('should throw 400 status when email is empty', async()=>{
    await request(app).post("/api/v1/auth/signup").send({
        name: "teet",
        password: "test"
    }).expect(400)
})

it('should throw 400 status when email is invalid', async()=>{
    await request(app).post("/api/v1/auth/signup").send({
        name: "teet",
        emaiL: "test@",
        password: "test"
    }).expect(400)
})

it('should throw 400 status when password is empty', async()=>{
    await request(app).post("/api/v1/auth/signup").send({
        email: "teet@gmail.com",
        name: "test"
    }).expect(400)
})

it('should throw 400 status when email is already taken', async()=>{
    await request(app).post("/api/v1/auth/signup").send({
        name: "test",
        email: "teet@gmail.com",
        password: "test"
    }).expect(201)

    await request(app).post("/api/v1/auth/signup").send({
        name: "test",
        email: "teet@gmail.com",
        password: "test"
    }).expect(400)
})

it('password should be hashed when signup', async()=>{
    const res= await request(app).post("/api/v1/auth/signup").send({
        name: "test",
        email: "teet@gmail.com",
        password: "test"
    }).expect(201)
    const createdUser= await User.findById(res.body.data.id)
    expect(createdUser!.password).not.toEqual("test")
})

it('should throw 201 status when  user created succesfully', async()=>{
    const res= await request(app).post("/api/v1/auth/signup").send({
        name: "test",
        email: "teet@gmail.com",
        password: "test"
    }).expect(201)
    expect(res.body.data).toBeDefined()
})
