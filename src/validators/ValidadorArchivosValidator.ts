import { body } from "express-validator";

/**
 * Reglas de validación para crear o actualizar datos en ValidadorArchivos.
 */
export const validateNuevoDato = [
  body("classifications")
    .isArray({ min: 1 })
    .withMessage("Se requiere un arreglo de clasificaciones con al menos un elemento."),
  body("classifications.*.NombreColumna")
    .isString()
    .notEmpty()
    .withMessage("El nombre de la columna no puede estar vacío.")
    .isLength({ min: 3, max: 255 })
    .withMessage("El nombre de la columna debe tener entre 3 y 255 caracteres."),
  body("classifications.*.TipoClasificacion")
    .isString()
    .notEmpty()
    .withMessage("El tipo de clasificación no puede estar vacío.")
    .isLength({ min: 3, max: 100 })
    .withMessage("El tipo de clasificación debe tener entre 3 y 100 caracteres."),
  body("classifications.*.Descripcion")
    .optional()
    .isString()
    .isLength({ max: 500 })
    .withMessage("La descripción no puede exceder los 500 caracteres."),
];

export const validateUpdateDato = [
  body("id")
    .isInt({ gt: 0 })
    .withMessage("Se requiere un ID válido para actualizar."),
  body("NombreColumna")
    .optional()
    .isString()
    .isLength({ min: 3, max: 255 })
    .withMessage("El nombre de la columna debe tener entre 3 y 255 caracteres."),
  body("TipoClasificacion")
    .optional()
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage("El tipo de clasificación debe tener entre 3 y 100 caracteres."),
  body("Descripcion")
    .optional()
    .isString()
    .isLength({ max: 500 })
    .withMessage("La descripción no puede exceder los 500 caracteres."),
];

export const validateDeleteDato = [
  body("id")
    .isInt({ gt: 0 })
    .withMessage("Se requiere un ID válido para eliminar."),
];
