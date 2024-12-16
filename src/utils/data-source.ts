import { DataSource } from "typeorm";
import { User } from "../models/user.model";
import { Role } from "../models/role.model";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT || "1433"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false, // Nunca uses `true` en producción
  logging: false, // Cambia a true para depuración
  options: {
    encrypt: true,
    trustServerCertificate: false, // Cambia a true si usas una base local
  },
  entities: [User, Role],
});
