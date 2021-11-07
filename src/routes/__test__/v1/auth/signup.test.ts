import request from "supertest";
import { app } from "../../../../app";
import { Role, RoleType } from "../../../../models/role";
import "../../../../test/setup";
import jwt from "jsonwebtoken";

it("should not throw 404 while calling signup endpoint", async () => {
  const res = await request(app).post("/api/v1/auth/signup").send({});
  expect(res.status).not.toEqual(404);
});

it("should throw 400 when name is missing", async () => {
  const res = await request(app).post("/api/v1/auth/signup").send({
    email: "test@gmail.com",
    password: "thisistest",
  });
  expect(400);
});

it("should throw 400 when email is missing", async () => {
  const res = await request(app).post("/api/v1/auth/signup").send({
    name: "Test_Name",
    password: "thisistest",
  });
  expect(400);
});

it("should throw 400 when password is missing", async () => {
  const res = await request(app).post("/api/v1/auth/signup").send({
    name: "Test_Name",
    email: "test@gmail.com",
  });
  expect(400);
});

it("should throw 400 when valid email is not provided", async () => {
  const res = await request(app).post("/api/v1/auth/signup").send({
    name: "Test_Name",
    email: "jptemail",
    password: "thisistest",
  });
  expect(400);
});

it("should throw 400 when valid password is less than 6", async () => {
  const res = await request(app).post("/api/v1/auth/signup").send({
    name: "Test_Name",
    email: "jptemail",
    password: "four",
  });
  expect(400);
});

it("should throw 400 when valid password is less than 20", async () => {
  const res = await request(app).post("/api/v1/auth/signup").send({
    name: "Test_Name",
    email: "jptemail",
    password: "123456789987654321452542",
  });
  expect(400);
});

it("should throw 400 if email already in use", async () => {
  await request(app).post("/api/v1/auth/signup").send({
    name: "Test_Name",
    email: "test@email.com",
    password: "testtest",
  });
  expect(201);
  const res = await request(app).post("/api/v1/auth/signup").send({
    name: "Test_Name",
    email: "test@email.com",
    password: "testtest",
  });
  expect(400);
});

it("user should contain valid role i.e role from database", async () => {
  const res = await request(app).post("/api/v1/auth/signup").send({
    name: "Test_Name",
    email: "test@email.com",
    password: "testtest",
  });
  expect(201);

  const role = await Role.findById(res.body.data.role._id);
  expect(role).toBeDefined();
  expect(role).not.toBeNull();
});

it("user email should not be verified if created normally", async () => {
  const res = await request(app).post("/api/v1/auth/signup").send({
    name: "Test_Name",
    email: "test@email.com",
    password: "testtest",
  });
  expect(201);

  expect(res.body.data.emailVerified).toBeFalsy();
});

it("accessToken should be returned", async () => {
  const res = await request(app).post("/api/v1/auth/signup").send({
    name: "Test_Name",
    email: "test@email.com",
    password: "testtest",
  });
  expect(201);

  expect(res.body.accessToken).toBeDefined();
});

it("accessToken decoded should contain id and email of that user", async () => {
  interface JWT {
    id: string;
    email: string;
  }
  const res = await request(app).post("/api/v1/auth/signup").send({
    name: "Test_Name",
    email: "test@email.com",
    password: "testtest",
  });
  expect(201);

  const decoded = await jwt.decode(res.body.accessToken);
  expect(res.body.data.id).toEqual((decoded as unknown as JWT).id);
  expect(res.body.data.email).toEqual((decoded as unknown as JWT).email);
});
