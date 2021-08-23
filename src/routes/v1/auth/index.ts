import express from "express";
import { errorHandler } from "../../../common";

import { signinRouter } from "./signin";
import { signupRouter } from "./signup";

const router = express.Router();

router.use(signinRouter);
router.use(signupRouter)

router.use(errorHandler);

export { router as indexAuthRouter };
