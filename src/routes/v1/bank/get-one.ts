import express from "express";
import { body } from "express-validator";
import { currentUser, requireAuth, validateRequest } from "../../../common";
import { getOneBankHandler } from "../../../controllers/v1/bank/get-one";

const router = express.Router();

router.get('/:id', currentUser, requireAuth, validateRequest, getOneBankHandler)

export { router as getOneBankRouter };
