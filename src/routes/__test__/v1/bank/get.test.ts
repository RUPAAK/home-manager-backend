import request from "supertest";
import { app } from "../../../../app";
import "../../../../test/setup";

it("should not throw 404 while calling get endpoint", async () => {
  const res = await request(app).get("/api/v1/banks");
  expect(res.status).not.toEqual(404);
});

it("should not throw 401 not authorized if token invalid", async () => {
  const res = await request(app)
    .get("/api/v1/banks")
    .set({
      Authorization: `Bearer token`,
    })
    .expect(401);
});

it("should throw data while calling get endpoint", async () => {
  const token = await global.signin();

  const res = await request(app)
    .get("/api/v1/banks")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .expect(200);
  expect(res.body.data).toBeDefined();
});

it("should return results and total and both should be number", async () => {
  const token = await global.signin();
  await request(app)
    .post("/api/v1/banks")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .send({
      name: "test",
      interest: "5%",
    })
    .expect(201);
  const res = await request(app)
    .get("/api/v1/banks")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .expect(200);
  expect(res.body.results).toBeDefined();
  expect(res.body.total).toBeDefined();
  expect(typeof res.body.results).toBe("number");
  expect(typeof res.body.total).toBe("number");
});

it("should return exact limit data provided in query", async () => {
  const token = await global.signin();

  await request(app)
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
      name: "test2",
      interest: "5%",
    })
    .expect(201);

  const res = await request(app)
    .get("/api/v1/banks?limit=1")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .expect(200);
  expect(res.body.results).toEqual(1);
  expect(res.body.total).toEqual(2);
  expect(res.body.data.length).toEqual(1);
});
