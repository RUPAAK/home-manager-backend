import request from "supertest";
import { app } from "../../../../app";
import "../../../../test/setup";

it("should not throw 404 while calling create endpoint", async () => {
  const res = await request(app)
    .post("/api/v1/transistions/4edd40c86762e0fb12000003")
    .send({});
  expect(res.status).not.toEqual(404);
});

it("should throw 401 error if token isnot provided", async () => {
  await request(app)
    .post("/api/v1/transistions/4edd40c86762e0fb12000003")
    .send({})
    .expect(401);
});

it("should throw 401 error if token is invalid", async () => {
  await request(app)
    .post("/api/v1/transistions/4edd40c86762e0fb12000003")
    .set({
      Authorization: "fjdsafdi",
    })
    .send({})
    .expect(401);
});
