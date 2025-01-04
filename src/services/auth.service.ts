// ./src/services/auth.service.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../utils/data-source";
import { Auth } from "../models/auth.model";


const authRepository = AppDataSource.getRepository(Auth);
/**
 * Registers a new user in the authentication service.
 *
 * @param data - The user data for registration.
 * @param data.nombre - The first name of the user.
 * @param data.apellido - The last name of the user.
 * @param data.correo - The email address of the user.
 * @param data.password - The password for the user account.
 * @param data.rol - The role of the user (optional, defaults to 2).
 * @returns The newly created user.
 * @throws {Error} If the email is already registered.
 */
export const registerAuthService = async (data: {
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
  rol?: number;
}) => {
  const { nombre, apellido, correo, password, rol = 2 } = data;

  const authRepository = AppDataSource.getRepository(Auth);
  const existingUser = await authRepository.findOneBy({ correo });

  if (existingUser) {
    throw new Error("El correo ya está registrado");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = authRepository.create({
    nombre,
    apellido,
    correo,
    password: hashedPassword,
    rol,
  });

  return await authRepository.save(newUser);
};

/**
 * Authenticates a user with the provided email and password.
 *
 * @param data - An object containing the user's email and password.
 * @param data.correo - The user's email address.
 * @param data.password - The user's password.
 * @returns A promise that resolves to a JWT token if authentication is successful.
 * @throws Will throw an error if the user is not found or if the password is incorrect.
 */
export const loginAuthService = async (data: { correo: string; password: string }) => {
  const { correo, password } = data;

  const authRepository = AppDataSource.getRepository(Auth);
  const user = await authRepository.findOneBy({ correo });

  if (!user) {
    throw new Error("Usuario o contraseña incorrectos");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Usuario o contraseña incorrectos");
  }

  const token = jwt.sign(
    { id: user.UsuarioID, correo: user.correo, rol: user.rol }, // Usa UsuarioID correctamente
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1h" }
  );

  return token;
};

export const resetPasswordService = async (
  userId: number,
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  const user = await authRepository.findOneBy({ UsuarioID: userId });
  
  if (!user) {
      throw new Error("Usuario no encontrado");
  }

  // Verify current password
  const isValidPassword = await bcrypt.compare(currentPassword, user.password);
  if (!isValidPassword) {
      throw new Error("Contraseña actual incorrecta");
  }

  // Hash and save new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await authRepository.save(user);
};