import request from "supertest";
import { app } from "../../../../app";
import { Role, RoleType } from "../../../../models/role";
import "../../../../test/setup";
import jwt from "jsonwebtoken";

it("should not throw 404 while calling signin endpoint", async () => {
  const res = await request(app).post("/api/v1/auth/signin").send({});
  expect(res.status).not.toEqual(404);
});

it("should throw 400 when email is missing", async () => {
  const res = await request(app).post("/api/v1/auth/signin").send({
    password: "thisistest",
  });
  expect(400);
});

it("should throw 400 when password is missing", async () => {
  const res = await request(app).post("/api/v1/auth/signin").send({
    email: "test@gmail.com",
  });
  expect(400);
});

it("should throw 400 if user isn't found", async () => {
  const res = await request(app).post("/api/v1/auth/signin").send({
    email: "test@gmail.com",
    password: "thisistest",
  });
  expect(400);
});

it("should throw 400 if password isn't matching", async () => {
  await request(app).post("/api/v1/auth/signup").send({
    name: "test_name",
    email: "test@gmail.com",
    password: "thisistest",
  });
  expect(201);

  const res = await request(app).post("/api/v1/auth/signip").send({
    email: "test@gmail.com",
    password: "thisistests",
  });
  expect(400);
});

it("user should contain valid role i.e role from database", async () => {
  await request(app).post("/api/v1/auth/signup").send({
    name: "Test_Name",
    email: "test@email.com",
    password: "testtest",
  });
  expect(201);

  const res = await request(app)
    .post("/api/v1/auth/signin")
    .send({
      email: "test@email.com",
      password: "testtest",
    })
    .expect(200);
  const role = await Role.findById(res.body.data.role.id);
  expect(role).toBeDefined();
  expect(role).not.toBeNull();
});

it("accessToken should be returned", async () => {
  await request(app).post("/api/v1/auth/signup").send({
    name: "Test_Name",
    email: "test@email.com",
    password: "testtest",
  });
  expect(201);

  const res = await request(app)
    .post("/api/v1/auth/signin")
    .send({
      email: "test@email.com",
      password: "testtest",
    })
    .expect(200);
  expect(res.body.accessToken).toBeDefined();
});

it("accessToken decoded should contain id and email of that user", async () => {
  interface JWT {
    id: string;
    email: string;
  }
  await request(app).post("/api/v1/auth/signup").send({
    name: "Test_Name",
    email: "test@email.com",
    password: "testtest",
  });
  expect(201);
  const res = await request(app).post("/api/v1/auth/signin").send({
    email: "test@email.com",
    password: "testtest",
  });
  expect(200);

  const decoded = await jwt.decode(res.body.accessToken);

  expect(res.body.data.id).toEqual((decoded as unknown as JWT).id);
  expect(res.body.data.email).toEqual((decoded as unknown as JWT).email);
});
