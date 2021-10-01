import request from "supertest";
import { app } from "../../../../app";
import { Bank } from "../../../../models/bank";
import "../../../../test/setup";

it("should not throw 404 while calling create endpoint", async () => {
  const res = await request(app).post("/api/v1/transistions").send({});
  expect(res.status).not.toEqual(404);
});

it("should throw 401 error if token isnot provided", async () => {
  await request(app).post("/api/v1/transistions").send({}).expect(401);
});

it("should throw 401 error if token is invalid", async () => {
  await request(app)
    .post("/api/v1/transistions")
    .set({
      Authorization: "fjdsassfdi",
    })
    .send({})
    .expect(401);
});

it("should throw 400 error if name isnot provided", async () => {
  const token = await global.signin();

  const res = await request(app)
    .post("/api/v1/transistions")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      amount: 5000,
      date: "2057/11/11",
      bank: "jfds4fsa8f4ds5dasf45",
    })
    .expect(400);
});

it("should throw 400 error if amount isnot provided", async () => {
  const token = await global.signin();

  const res = await request(app)
    .post("/api/v1/transistions")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: "Spend this money on shopping",
      date: "2057/11/11",
      bank: "jfds4fsa8f4ds5dasf45",
    })
    .expect(400);
});

it("should throw 400 error if date isnot provided", async () => {
  const token = await global.signin();

  const res = await request(app)
    .post("/api/v1/transistions")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: "Spend this money on shopping",
      amount: 5000,
      bank: "jfds4fsa8f4ds5dasf45",
    })
    .expect(400);
});

it("should throw 400 error if bankid isnot provided", async () => {
  const token = await global.signin();

  const res = await request(app)
    .post("/api/v1/transistions")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: "Spend this money on shopping",
      amount: 5000,
      bank: "jfds4fsa8f4ds5dasf45",
    })
    .expect(400);
});

it("should throw 400 error if bank isnot found", async () => {
  const token = await global.signin();

  const res = await request(app)
    .post("/api/v1/transistions")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: "Spend this money on shopping",
      amount: 5000,
      date: "2057/11/11",
      bank: "jfds4fsa8f4dfds5dasf45",
    })
    .expect(400);
});

it("should throw if bank amount is less than transistion", async () => {
  const token = await global.signin();

  const res = await request(app)
    .post("/api/v1/banks")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: "This is length",
      amount: 5000,
      date: "2057/11/11",
    })
    .expect(201);

  await request(app)
    .post("/api/v1/transistions")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: "Spend this money on shopping",
      amount: 10000,
      date: "2057/11/11",
      bank: res.body.data.id,
    })
    .expect(400);
});

it("should deduct amount from bank afet sucessful transistion creation", async () => {
  const token = await global.signin();

  const res = await request(app)
    .post("/api/v1/banks")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: "This is length",
      amount: 5000,
      date: "2057/11/11",
    })
    .expect(201);

  await request(app)
    .post("/api/v1/transistions")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: "Spend this money on shopping",
      amount: 1000,
      date: "2057/11/11",
      bank: res.body.data.id,
    })
    .expect(200);

  const thatBank = await Bank.findById(res.body.data.id);
  expect(thatBank!.amount).toEqual(4000);
});

it("should sucessfully create transision  ", async () => {
  const token = await global.signin();

  const res = await request(app)
    .post("/api/v1/banks")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: "This is length",
      amount: 5000,
      date: "2057/11/11",
    })
    .expect(201);

  const res2= await request(app)
    .post("/api/v1/transistions")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: "Spend this money on shopping",
      amount: 1000,
      date: "2057/11/11",
      bank: res.body.data.id,
    })
    .expect(200);

  expect(res2.body.data).toBeDefined();
});
