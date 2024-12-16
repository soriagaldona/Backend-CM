//src/middleware/validate.middleware.ts

import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export const validateDto = (DtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dtoInstance = plainToInstance(DtoClass, req.body);
      const errors = await validate(dtoInstance);

      if (errors.length > 0) {
        res.status(400).json({
          error: "Error de validación",
          details: errors.map((err) => Object.values(err.constraints || {})),
        });
      } else {
        next(); // Pasar al siguiente middleware si no hay errores
      }
    } catch (error) {
      next(error); // Pasar errores inesperados al manejador de errores global
    }
  };
};
