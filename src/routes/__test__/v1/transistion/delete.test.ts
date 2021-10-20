import request from "supertest";
import { app } from "../../../../app";
import "../../../../test/setup";

it("should not throw 404 while calling create endpoint", async () => {
  const res = await request(app).delete(
    "/api/v1/transistions/4edd40c86762e0fb12000003"
  );
  expect(res.status).not.toEqual(404);
});

it("should throw 401 if token not given", async () => {
  const res = await request(app)
    .delete("/api/v1/transistions/4edd40c86762e0fb12000003")
    .set({
      Authorization: `Bearer token`,
    })
    .expect(401);
});

it("should throw 400 if transistion is not found", async () => {
  const token = await global.signin();
  const res = await request(app)
    .delete("/api/v1/transistions/4edd40c86762e0fb12000003")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .expect(400);
});

it("should throw 200 and successfully delete transistion", async () => {
  const token = await global.signin();
  const bank = await request(app)
    .post("/api/v1/banks")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: "test",
      amount: 5000,
      interest: "5%",
      date: "2057/11/11",
    });

  const res = await request(app)
    .post("/api/v1/transistions")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: "This is length",
      amount: 5000,
      date: "2057/11/11",
      bank: bank.body.data.id,
    })
    .expect(201);
  const res2 = await request(app)
    .delete(`/api/v1/transistions/${res.body.data.id}`)
    .set({
      Authorization: `Bearer ${token}`,
    })
    .expect(200);
  expect(res2.body.data).toBe(null);
});
