import express from "express";
import { errorHandler } from "../../../common";
import { addExpenseRouter } from "./create";
import { deleteExpenseRouter } from "./delete";
import { getExpensesRouter } from "./get";
import { getUserExpenseRouter } from "./get-user";
import { updateExpenseRouter } from "./update";

const router = express.Router();

router.use(addExpenseRouter)
router.use(getExpensesRouter)
router.use(updateExpenseRouter)
router.use(deleteExpenseRouter)
<<<<<<< HEAD
=======
router.use(getUserExpenseRouter)
>>>>>>> 224d15bcfeb18c8886d96f9b5d05c430d4a7912e

router.use(errorHandler);

export { router as indexExpenseRouter };
