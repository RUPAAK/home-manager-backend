// Express Related Things
import express from "express";
import cors from "cors";
import "express-async-errors";
import { json } from "body-parser";

import { indexAuthRouter } from "./routes/v1/auth";
import { errorHandler, NotFoundError } from "./common";
;

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(cors())

app.use("/api/v1/auth", indexAuthRouter);

app.all("/", async (req, res) => {
  if (process.env.PORT === "4500") {
    // Dev Environment
    res.send({
      message: "Backend Server is Working",
      env: "Development",
    });
  }

  if (process.env.PORT === "4444") {
    // Prod Environment
    res.send({
      message: "Backend Server is Working",
      env: "Production",
    });
  }
});

app.all("*", (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
