// ./app.ts

import express from "express";
import authRoutes from "./routes/auth.routes";
import ValidadorArchivosRoutes from "./routes/ValidadorArchivosRoutes";
import errorHandler from "./middleware/errorHandler";
import { authMiddleware } from "./middleware/auth.middleware";

const app = express();

// Middleware global
app.use(express.json()); // Parsear solicitudes JSON

// Rutas unificadas bajo el prefijo /api
app.use("/api/auth", authRoutes); // Rutas de autenticación (registro y login)
app.use("/api/validador", authMiddleware, ValidadorArchivosRoutes); // Rutas protegidas

// Middleware de manejo de errores
app.use(errorHandler);

export default app;
