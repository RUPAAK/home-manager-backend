import express from "express";
import { createTransistionRouter } from "./create";
import { deleteTransistionRouter } from "./delete";

const router = express.Router();

router.use(createTransistionRouter);
router.use(deleteTransistionRouter)

export { router as indexTransistionRouter };
