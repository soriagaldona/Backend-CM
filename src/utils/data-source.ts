import { DataSource } from "typeorm";
import { Auth } from "../models/auth.model";
import { AnimalEntity } from "../models/animal.model";
import { ValidadorArchivos } from "../models/ValidadorArchivos";
import { PotreroEntity } from "../models/potrero.model";
import { LoteEntity } from "../models/lote.model";
import { LoteHistoryEntity } from "../models/loteHistory.model";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "postgres",
    database: process.env.DB_NAME || "livestock_db",
    synchronize: true,
    logging: false,
    entities: [Auth, AnimalEntity, ValidadorArchivos, PotreroEntity, LoteEntity, LoteHistoryEntity],
    migrations: [],
    subscribers: []
});