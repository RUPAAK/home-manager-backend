import request from "supertest";
import { app } from "../../../../app";
import "../../../../test/setup";

it("should not throw 404 while calling create endpoint", async () => {
  const res = await request(app)
    .patch("/api/v1/banks/4edd40c86762e0fb12000003")
    .send({});
  expect(res.status).not.toEqual(404);
});

it("should throw 401 error if token isnot provided", async () => {
  await request(app)
    .patch("/api/v1/banks/4edd40c86762e0fb12000003")
    .send({})
    .expect(401);
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

it("should throw 400 if bank of that id not found", async () => {
  const token = await global.signin();
  await request(app)
    .patch("/api/v1/banks/4edd40c86762e0fb12000003")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: "test",
      amount: 2000,
      interest: "5%",
    })
    .expect(400);
});

it("should return updated name and interest", async () => {
  const token = await global.signin();
  const res = await request(app)
    .post("/api/v1/banks")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: "test",
      amount: 5000,
      interest: "5%",
    })
    .expect(201);
  const res2 = await request(app)
    .patch(`/api/v1/banks/${res.body.data.id}`)
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: "test2",
      interest: "10%",
    })
    .expect(200);

  expect(res2.body.data.name).toBeDefined();
  expect(res2.body.data.interest).toBeDefined();
  expect(res2.body.data.name).toEqual("test2");
  expect(res2.body.data.interest).toEqual("10%");
});

it("should return updated active status", async () => {
  const token = await global.signin();
  const res = await request(app)
    .post("/api/v1/banks")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: "test",
      amount: 5000,
      interest: "5%",
    })
    .expect(201);
  const res2 = await request(app)
    .patch(`/api/v1/banks/${res.body.data.id}`)
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: "updated",
      active: false,
    })
    .expect(200);

  expect(res2.body.data.active).not.toBeTruthy();
});
