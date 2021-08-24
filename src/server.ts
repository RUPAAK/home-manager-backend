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

const DB= process.env.MONGO_URL!

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("CONNECTION TO DATABASE SUCCESSFUL"));

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`App is Listening on Port ${port}`);
});

