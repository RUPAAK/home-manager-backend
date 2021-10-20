import express from "express";
import { body } from "express-validator";
import { currentUser, requireAuth, validateRequest } from "../../../common";
import { getBanksHandler } from "../../../controllers/v1/bank/get";

const router = express.Router();

router.get('/', currentUser, requireAuth, validateRequest, getBanksHandler)

export { router as getBanksRouter };
