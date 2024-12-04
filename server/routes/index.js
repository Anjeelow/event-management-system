import { Router } from "express";
import userRouter from "./userRoutes.js";
import eventRouter from "./eventRoutes.js";

const router = Router();

router.use(userRouter);
router.use(eventRouter);
console.log("Ive been reached!");

export default router;
