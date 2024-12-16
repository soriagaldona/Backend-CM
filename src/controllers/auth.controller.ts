// ./src/controllers/auth.controller.ts
import { Request, Response } from "express";
import { registerAuthService, loginAuthService } from "../services/auth.service";

/**
 * Registers a new user.
 *
 * This function handles the registration of a new user by calling the
 * `registerAuthService` with the request body. If the registration is
 * successful, it responds with a status of 201 and a success message along
 * with the user data. If there is an error, it responds with a status of 400
 * and the error message.
 *
 * @param req - The request object containing the user registration data.
 * @param res - The response object used to send back the HTTP response.
 * @returns A promise that resolves to the HTTP response.
 */
export const registerAuth = async (req: Request, res: Response) => {
  try {
    const user = await registerAuthService(req.body);
    res.status(201).json({ message: "Usuario registrado exitosamente", user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * Handles the login authentication process.
 *
 * @param req - The request object containing the login credentials.
 * @param res - The response object to send the result of the authentication process.
 * @returns A JSON response with a success message and the authentication token if successful,
 *          or an error message if the authentication fails.
 */
export const loginAuth = async (req: Request, res: Response) => {
  try {
    const token = await loginAuthService(req.body);
    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
