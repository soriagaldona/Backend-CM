import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import ValidadorArchivosRoutes from "./routes/ValidadorArchivosRoutes";
import sharepointRoutes from "./sharepoint/sharepoint.routes"; 
import errorHandler from "./middleware/errorHandler";
import { authMiddleware } from "./middleware/auth.middleware";
import potreroRoutes from "./routes/potrero.routes";
import loteRoutes from "./routes/lote.routes";



const app = express();

// Middleware global
app.use(cors());
app.use(express.json()); // Parsear solicitudes JSON

// Basic health check route
app.get("/", (req, res) => {
    res.json({ message: "API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/validador", authMiddleware, ValidadorArchivosRoutes);
app.use("/api", potreroRoutes);
app.use("/api", loteRoutes);
app.use("/api/sharepoint", sharepointRoutes);


app.use(errorHandler);

export default app;