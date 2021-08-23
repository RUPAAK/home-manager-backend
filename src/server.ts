import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Sutting down.....");
  console.log(err);
  process.exit(1);
});

dotenv.config();

const server = require("http").createServer(app);

const DB = process.env.DATABASE!.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD || "medprepnepal2O2O"
);

mongoose
  .connect(DB, {
    authSource: "admin",
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("CONNECTION TO DATABASE SUCCESSFUL"));

const port = process.env.PORT || 9261;

server.listen(port, () => {
  console.log(`App is Listening on Port ${port}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection is disconnected.");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});

type RejectionError = {
  name: string;
  message: string;
};

process.on("unhandledRejection", (err: RejectionError) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Sutting down.....");
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED. Sutting Down gracefully");
  server.close(() => {
    console.log("Process terminated!");
  });
});
