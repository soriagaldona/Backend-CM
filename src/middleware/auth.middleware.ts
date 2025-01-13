import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '../utils/constants';


export interface AuthRequest extends Request {
    user?: {
        id: number;
        correo: string;
        rol: number;
    }
}

export const authMiddleware: RequestHandler = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({ message: "No token provided" });
            return;
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, JWT_SECRET) as {
            id: number;
            correo: string;
            rol: number;
        };

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
        // return;
    }
};