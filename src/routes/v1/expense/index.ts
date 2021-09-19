import express from "express";
import { errorHandler } from "../../../common";
import { addExpenseRouter } from "./create";
import { getExpensesRouter } from "./get";

const router = express.Router();

router.use(addExpenseRouter)
router.use(getExpensesRouter)

router.use(errorHandler);

export { router as indexExpenseRouter };
