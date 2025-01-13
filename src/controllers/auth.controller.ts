import { Request, Response, RequestHandler } from "express";
import { registerAuthService, loginAuthService, resetPasswordService } from "../services/auth.service";
import { AuthRequest } from "../middleware/auth.middleware";

export const registerAuth = async (req: Request, res: Response) => {
    try {
        const user = await registerAuthService(req.body);
        res.status(201).json({ message: "Usuario registrado exitosamente", user });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const loginAuth = async (req: Request, res: Response) => {
    try {
        const token = await loginAuthService(req.body);
        res.status(200).json({ message: "Inicio de sesión exitoso", token });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const resetPassword: RequestHandler = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.user?.id) {
            res.status(401).json({ message: "Usuario no autenticado" });
            return;
        }

        const { currentPassword, newPassword } = req.body;
        
        if (!currentPassword || !newPassword) {
            res.status(400).json({ 
                message: "Se requiere contraseña actual y nueva contraseña" 
            });
            return;
        }

        await resetPasswordService(
            req.user.id, 
            currentPassword, 
            newPassword
        );

        res.status(200).json({ message: "Contraseña actualizada exitosamente" });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};