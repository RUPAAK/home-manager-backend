// Express Related Things
import express from "express";
import cors from "cors";
import "express-async-errors";
import { json } from "body-parser";

import { indexAuthRouter } from "./routes/v1/auth";
import { errorHandler, NotFoundError } from "./common";
import { indexExpenseRouter } from "./routes/v1/expense";
import { indexBankTransRouter } from "./routes/v1/bank";
import { indexTransistionRouter } from "./routes/v1/transistion";
const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(cors());

app.get("/", async (req, res) => {
  res.send("Hello There");
});

app.use("/api/v1/auth", indexAuthRouter);
app.use("/api/v1/expenses", indexExpenseRouter);
app.use("/api/v1/banks", indexBankTransRouter);
app.use("/api/v1/transistions", indexTransistionRouter);

app.all("*", (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
