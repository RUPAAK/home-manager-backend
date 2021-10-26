import express from "express";
import { body } from "express-validator";
import { currentUser, requireAuth, validateRequest } from "../../../common";
import { createBankHandler } from "../../../controllers/v1/bank/create";

const router = express.Router();

router.post(
  "/",
  currentUser,
  requireAuth,
  [
    body("name").notEmpty().withMessage("Name must be provided"),
    body("amount").notEmpty().withMessage("Amount must be provided"),
    body("interest").notEmpty().withMessage("Interest must be provided"),
  ],
  validateRequest,
  createBankHandler
);

export { router as createBankRouter };
