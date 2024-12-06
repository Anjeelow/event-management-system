import { Router } from "express";
import userRouter from "./userRoutes.js";
import eventRouter from "./eventRoutes.js";
import signup from "./signup.js"

const router = Router();

router.use(userRouter);
router.use(eventRouter);
router.use(signup);
console.log("Ive been reached!");

export default router;
