// * ROUTES FOR SIGNIP

import express from "express";
import { body } from "express-validator";
import { validateRequest } from "../../../common";
import { signinHandler } from "../../../controllers/v1/auth/signin";

const router = express.Router();

router.use(
  "/signin",
  [
    body("email").isEmail().notEmpty().withMessage("Valid Email is required"),
    body("password").notEmpty().withMessage("Valid Password is required"),
  ],
  validateRequest,
  signinHandler
);

export { router as signinRouter };
