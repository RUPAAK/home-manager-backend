import request from "supertest";
import { app } from "../../../../app";
import "../../../../test/setup";

it("should not throw 404 while calling signin endpoint", async () => {
  const res = await request(app).get("/api/v1/banks");
  expect(res.status).not.toEqual(404);
});

it("should throw 401 error if token isnot provided", async () => {
  await request(app).get("/api/v1/banks").expect(401);
});

it("should throw 401 error if token is invalid", async () => {
  await request(app)
    .get("/api/v1/banks")
    .set({
      Authorization: "fjdsafdi",
    })
    .expect(401);
});

it("should throw 200 and data must be defined", async () => {
  const token = await global.signin();

   const res= await request(app)
    .get("/api/v1/banks")
    .set({
      Authorization: `Bearer ${token}`,
    })
    .expect(200);

    expect(res.body.data).toBeDefined()
});
