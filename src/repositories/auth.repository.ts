import { AppDataSource } from "../utils/data-source";
import { Auth } from "../models/auth.model";

/**
 * Repository for the Auth entity.
 * Provides methods to perform CRUD operations on the Auth table in the database.
 */
export const AuthRepository = AppDataSource.getRepository(Auth);
