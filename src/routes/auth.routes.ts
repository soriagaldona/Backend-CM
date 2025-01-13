// ./src/routes/auth.routes.ts
import { Router } from "express";
import { registerAuth, loginAuth, resetPassword } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

/**
 * Creates a new instance of the Router.
 * This router will handle authentication-related routes.
 */
const router = Router();

router.post("/register", registerAuth);
router.post("/login", loginAuth);
router.post("/reset-password", authMiddleware, resetPassword);


export default router;
