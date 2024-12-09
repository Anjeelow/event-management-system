import { Router } from "express";
import userRouter from "./userRoutes.js";
import eventRouter from "./eventRoutes.js";
import signup from "./signup.js";
import login from "./login.js";
import verifyToken from "./verifyToken.js"

const router = Router();

router.use(userRouter);
router.use(eventRouter);
router.use(signup);
router.use(login);
router.use(verifyToken)
console.log("Ive been reached!");

export default router;
