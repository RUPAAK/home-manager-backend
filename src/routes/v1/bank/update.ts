import express from "express";
import { body } from "express-validator";
import { currentUser, requireAuth, validateRequest } from "../../../common";
import { updateBankHandler } from "../../../controllers/v1/bank/update";

const router = express.Router();

router.patch(
  "/:id",
  currentUser,
  requireAuth,
  validateRequest,
  updateBankHandler
);

export { router as updateBankRouter };
