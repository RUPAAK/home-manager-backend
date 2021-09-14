import express from "express";
import { errorHandler } from "../../../common";
import { addExpenseRouter } from "./create";

const router = express.Router();

router.use(addExpenseRouter)

router.use(errorHandler);

export { router as indexExpenseRouter };
