import request from "supertest";
import { app } from "../../../../app";
import "../../../../test/setup";

it("should not throw 404 while calling create endpoint", async () => {
  const res = await request(app).post("/api/v1/banks").send({});
  expect(res.status).not.toEqual(404);
});

it("should throw 401 error if token isnot provided", async () => {
  await request(app).post("/api/v1/banks").send({}).expect(401);
});

it("should throw 400 if name isn't provided", async () => {
  const token = await global.signin();
  const res = await request(app)
    .post("/api/v1/banks")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      interest: "5%",
    })
    .expect(400);
});

it("should throw 400 if interest isn't provided", async () => {
  const token = await global.signin();
  const res = await request(app)
    .post("/api/v1/banks")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: "test",
    })
    .expect(400);
});

it("should throw 401 error if token is invalid", async () => {
  await request(app)
    .post("/api/v1/banks")
    .set({
      Authorization: "fjdsafdi",
    })
    .send({})
    .expect(401);
});

it("should throw 400 if bank of the name alerady exist", async () => {
  const token = await global.signin();
  const res = await request(app)
    .post("/api/v1/banks")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: "test",
      interest: "5%",
    })
    .expect(201);
  await request(app)
    .post("/api/v1/banks")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: res.body.data.name,
      interest: "5%",
    })
    .expect(400);
});

it("should return name and interest of bank after creation", async () => {
  const token = await global.signin();
  const res = await request(app)
    .post("/api/v1/banks")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: "test",
      interest: "5%",
    })
    .expect(201);
  expect(res.body.data.name).toBeDefined();
  expect(res.body.data.interest).toBeDefined();
  expect(res.body.data.name).toEqual("test");
  expect(res.body.data.interest).toEqual("5%");
});

it("should return bankt and active true", async () => {
  const token = await global.signin();
  const res = await request(app)
    .post("/api/v1/banks")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: "test",
      interest: "5%",
    })
    .expect(201);
  expect(res.body.data.active).toBeTruthy()
});
