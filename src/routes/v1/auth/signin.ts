import express from "express";
import { body } from "express-validator";
import { validateRequest } from "../../../common";
import { signinHandler } from "../../../controllers/v1/auth/signin";

const router = express.Router();

router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,

  signinHandler
);

export { router as signinRouter };
