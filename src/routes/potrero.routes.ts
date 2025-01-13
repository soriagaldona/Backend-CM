// src/routes/potrero.routes.ts

import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  getPotreros,
  getPotrero,
  createPotrero,
  updatePotrero,
  deletePotrero,
} from "../controllers/potrero.controller";

const router = Router();

// All routes are protected with JWT authentication
router.use(authMiddleware);

router.get("/potreros", getPotreros);
router.get("/potreros/:id", getPotrero);
router.post("/potreros", createPotrero);
router.put("/potreros/:id", updatePotrero);
router.delete("/potreros/:id", deletePotrero);

export default router;