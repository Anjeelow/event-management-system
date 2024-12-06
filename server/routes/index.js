import { Router } from "express";
import userRouter from "./userRoutes.js";
import eventRouter from "./eventRoutes.js";
import signup from "./signup.js"
import login from "./login.js"

const router = Router();

router.use(userRouter);
router.use(eventRouter);
router.use(signup);
router.use(login)
console.log("Ive been reached!");

export default router;
