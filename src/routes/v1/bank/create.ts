import express from "express";
import { body } from "express-validator";
import { currentUser, requireAuth, validateRequest } from "../../../common";
import { createBankTransHandler } from "../../../controllers/v1/bank/create";

const router = express.Router();

router.post(
  "/",
  currentUser,
  requireAuth,
  [
    body("name").notEmpty().withMessage("Bank name must be provided"),
    body("amount").notEmpty().withMessage("Amount must be valid"),
    body("date").notEmpty().withMessage("Date must be valid"),
  ],
  validateRequest,
  createBankTransHandler
);

export { router as createBankTransRouter };
