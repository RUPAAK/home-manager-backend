import { currentUser, requireAuth, validateRequest } from "../../../common";
import express from "express";
import { createTransistionHandler } from "../../../controllers/v1/transistion/create";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/",
  currentUser,
  requireAuth,
  [
    body("name").notEmpty().withMessage("Transistion name must be provided"),
    body("amount").notEmpty().withMessage("Amount must be valid"),
    body("date").notEmpty().withMessage("Date must be valid"),
    body("bank").notEmpty().withMessage("Bank must be valid"),
  ],
  validateRequest,
  createTransistionHandler
);

export { router as createTransistionRouter };
