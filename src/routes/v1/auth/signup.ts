// * ROUTES FOR SIGNUP

import express from "express";
import { body } from "express-validator";
import { validateRequest } from "../../../common";
import { signupHandler } from "../../../controllers/v1/auth/signup";

const router = express.Router();

router.use(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().notEmpty().withMessage("Valid Email is required"),
    body("password")
      .notEmpty()
      .isLength({ min: 6, max: 20 })
      .withMessage("Valid Password is required"),
  ],
  validateRequest,
  signupHandler
);

export { router as signupRouter };
