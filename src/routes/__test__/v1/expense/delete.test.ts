import request from "supertest";
import { app } from "../../../../app";
import "../../../../test/setup";

it("should not throw 404 while calling create endpoint", async () => {
  const res = await request(app).delete(
    "/api/v1/expenses/4edd40c86762e0fb12000003"
  );
  expect(res.status).not.toEqual(404);
});

it("should throw 401 if token not given", async () => {
  const res = await request(app)
    .delete("/api/v1/expenses/4edd40c86762e0fb12000003")
    .set({
      Authorization: `Bearer token`,
    })
    .expect(401);
});

it("should throw 400 if expense is not found", async () => {
  const token = await global.signin();
  const res = await request(app)
    .delete("/api/v1/expenses/4edd40c86762e0fb12000003")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .expect(400);
});

it("should throw 200 and successfully delete expense", async () => {
  const token = await global.signin();
  const res = await request(app)
    .post("/api/v1/expenses")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: "This is length",
      amount: 5000,
      date: "2057/11/11",
    })
    .expect(201);
  const res2 = await request(app)
    .delete(`/api/v1/expenses/${res.body.data.id}`)
    .set({
      Authorization: `Bearer ${token}`,
    })
    .expect(200);
  expect(res2.body.data).toBe(null);
});
