// ./src/routes/auth.routes.ts
import { Router } from "express";
import { registerAuth, loginAuth } from "../controllers/auth.controller";

/**
 * Creates a new instance of the Router.
 * This router will handle authentication-related routes.
 */
const router = Router();

router.post("/register", registerAuth);
router.post("/login", loginAuth);

// Ruta GET para /auth
router.get("/auth", (req, res) => {
    res.status(200).json({ message: "Auth endpoint is working!" });
});

export default router;
