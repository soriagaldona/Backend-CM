import { Response, RequestHandler } from "express";
import { createNewLote, getLotes, updateExistingLote } from "../services/lote.service";
import { AuthRequest } from "../middleware/auth.middleware";

export const createLote: RequestHandler = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const lote = await createNewLote(req.body, req.user.id);
        res.status(201).json({ message: "Lote created successfully", lote });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const getLotesList: RequestHandler = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const filters = {
            potreros_id: req.query.potreros_id as string,
            lote_name: req.query.lote_name as string,
            created_by: req.query.created_by ? Number(req.query.created_by) : undefined,
            created_on: req.query.created_on ? new Date(req.query.created_on as string) : undefined
        };

        const lotes = await getLotes(filters);
        res.status(200).json(lotes);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateLote: RequestHandler = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const { id } = req.params;
        const lote = await updateExistingLote(Number(id), req.body, req.user.id);
        res.status(200).json({ message: "Lote updated successfully", lote });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};