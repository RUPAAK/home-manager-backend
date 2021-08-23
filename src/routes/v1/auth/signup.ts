import express from "express";
import { body } from "express-validator";
import { validateRequest } from "../../../common";
import { Request, Response } from "express";
import { signupHandler } from "../../../controllers/v1/auth/signup";

const router = express.Router();

router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name must be provided"),
    body("email").notEmpty().isEmail().withMessage("Email must be valid"),
    body("password")
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,

  signupHandler
);

export { router as signupRouter };
