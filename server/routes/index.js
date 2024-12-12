import { Router } from "express";
import userRouter from "./userRoutes.js";
import eventRouter from "./eventRoutes.js";
import rsvpRouter from "./rsvpRoutes.js"
import signup from "./signup.js";
import login from "./login.js";
import verifyToken from "./verifyToken.js";
import filters from "./filters.js";
import notificationRouter from "./notificationRoutes.js"

const router = Router();

router.use(userRouter);
router.use(eventRouter);
router.use(rsvpRouter);
router.use(signup);
router.use(login);
router.use(verifyToken);
router.use(filters);
router.use(notificationRouter)
console.log("Ive been reached!");

export default router;
