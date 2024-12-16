// ./src/validators/authValidator.ts
import { body } from "express-validator";

export const loginValidator = [
  body("correo").isEmail().withMessage("Correo inválido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];

export const registerValidator = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("correo").isEmail().withMessage("Correo inválido"),
  body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
];
