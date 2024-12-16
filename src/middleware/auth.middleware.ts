// ./src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';

/**
 * Middleware de autenticación.
 *
 * Esta función middleware se utiliza para manejar la autenticación en las rutas.
 * Si no se necesita autenticar la ruta, simplemente llama a `next()` para pasar
 * al siguiente middleware o controlador.
 *
 * @param req - El objeto de solicitud HTTP.
 * @param res - El objeto de respuesta HTTP.
 * @param next - La función que se llama para pasar al siguiente middleware.
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Si no necesitas autenticar esta ruta, simplemente llama a next()
  next();
};
