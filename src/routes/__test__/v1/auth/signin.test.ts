import request from "supertest";
import { app } from "../../../../app";
import "../../../../test/setup";

it("should not throw 404 while calling signin endpoint", async () => {
  const res = await request(app).post("/api/v1/auth/signin").send({});
  expect(res.status).not.toEqual(404);
});

it("should throw 400 when email is missing", async () => {
  const res = await request(app)
    .post("/api/v1/auth/signin")
    .send({ password: "test" });
});

it("should throw 400 when password is missing", async () => {
  const res = await request(app)
    .post("/api/v1/auth/signin")
    .send({ email: "test@gmail.com" })
    .expect(400);
});

it("should throw 400 when email and password are missing", async () => {
  const res = await request(app)
    .post("/api/v1/auth/signin")
    .send({})
    .expect(400);
});

it("should throw 400 when when when is not register", async () => {
  const res = await request(app)
    .post("/api/v1/auth/signin")
    .send({
      email: "test@bcdv.com",
      password: "kathmandu",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await request(app).post("/api/v1/auth/signup").send({
    name: "test",
    email: "test@gmail.com",
    password: "test"
  }).expect(201)
  await await request(app).post("/api/v1/auth/signin").send({
    email: "test@gmail.com",
    password: "testest"
  }).expect(400)
});

it("responds with a access token when given valid credentials", async () => {
  await request(app).post("/api/v1/auth/signup").send({
    name: "test",
    email: "test@gmail.com",
    password: "test"
  }).expect(201)
  const res= await await request(app).post("/api/v1/auth/signin").send({
    email: "test@gmail.com",
    password: "test"
  })

  expect(res.body.accessToken).toBeDefined()
});

