
// ./middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack); // Log para depuración
  res.status(500).json({ message: "Error interno del servidor" });
};

export default errorHandler;
