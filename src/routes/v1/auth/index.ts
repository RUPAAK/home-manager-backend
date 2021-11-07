// * EXPORT EVERY AUTH ROUTES FROM INDEX

import express from "express";
import { signinRouter } from "./signin";
import { signupRouter } from "./signup";

const router = express.Router();

router.use(signupRouter);
router.use(signinRouter);

export { router as indexAuthRouter };
