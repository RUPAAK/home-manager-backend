// Express Related Things
import express from "express";
import cors from "cors";
import "express-async-errors";
import { json } from "body-parser";

import { errorHandler, NotFoundError } from "./common";
import { indexAuthRouter } from "./routes/v1/auth";
import { Role } from "./models/role";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(cors());

app.get("/", async (req, res) => {
  res.send("Hello There");
});

app.use("/api/v1/auth", indexAuthRouter);

app.all("*", (req, res) => {
  throw new NotFoundError();
});


app.use(errorHandler);
// app.use(NotFoundError);

export { app };
