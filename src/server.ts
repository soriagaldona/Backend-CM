import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "./utils/data-source";
import app from './app';

const PORT = process.env.PORT || 8000;

// Initialize database and start server
const startServer = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database connected successfully to:", process.env.DB_NAME);

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
};

startServer();