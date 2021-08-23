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
    .send({ password: "kathmagjdh" });
  // console.log(res.error);
});

it("should throw 400 when password is missing", async () => {
  const res = await request(app)
    .post("/api/v1/auth/signin")
    .send({ email: "kathmagjdh@gmail.com" })
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
      email: "afdsfsdf@bcdv.com",
      password: "kathmandu",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {});

it("responds with a access token when given valid credentials", async () => {});

it("returns createdAt and updatedAt fields with successful login", async () => {});

it("should have lastLogged in field when new user login", async () => {});
