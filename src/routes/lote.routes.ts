import { Router } from "express";
import { createLote, getLotesList, updateLote } from "../controllers/lote.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);


router.post("/lotes", createLote);
router.get("/lotes", getLotesList);
router.put("/lotes/:id", updateLote);

export default router;