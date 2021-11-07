import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import { RoleType } from "../models/role";
import { User } from "../models/user";

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
      signinAdmin(): Promise<string[]>;
    }
  }
}

// jest.mock("../services/facebook.ts");

jest.setTimeout(500000);

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = async () => {
  const email = "test@test.com";
  const password = "password";
  const name = "test test";

  // Create a Super admin acc

  const response = await request(app)
    .post("/api/v1/auth/signup")
    .send({
      email,
      password,
      name,
    })
    .expect(201);

  await User.findByIdAndUpdate(response.body.data.id, { role: RoleType.user });

  const accessToken = response.body.accessToken;

  return accessToken;
};

global.signinAdmin = async () => {
  const email = "test1@test.com";
  const password = "password";
  const name = "test test";

  const response = await request(app)
    .post("/api/v1/auth/signup")
    .send({
      email,
      password,
      name,
    })
    .expect(201);

  await User.findByIdAndUpdate(response.body.data.id, { role: RoleType.user });

  const accessToken = response.body.accessToken;

  return accessToken;
};
