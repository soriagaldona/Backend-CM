// ./src/server.ts

import dotenv from "dotenv";
import { AppDataSource } from "./utils/data-source";
import app from './app';  // Importa la instancia de app desde app.ts

dotenv.config();

const PORT = process.env.PORT || 8000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error("Error al conectar a la base de datos:", error));
