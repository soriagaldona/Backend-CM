// src/controllers/roleController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../utils/data-source';
import { Role } from '../models/role';

/**
 * Retrieves all roles from the database and sends them in the response.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON array of roles with a status code of 200 if successful, 
 *          or a JSON error message with a status code of 500 if an error occurs.
 * 
 * @throws Will log an error message to the console and send a 500 status code 
 *         with an error message if there is an issue retrieving the roles.
 */
export const getRoles = async (req: Request, res: Response) => {
  try {
    const roleRepository = AppDataSource.getRepository(Role);
    const roles = await roleRepository.find();
    res.status(200).json(roles);
  } catch (error) {
    console.error('Error al obtener roles:', error);
    res.status(500).json({ message: 'Error al obtener roles' });
  }
};
