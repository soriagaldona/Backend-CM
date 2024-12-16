// src/controllers/ValidadorArchivosControllers.ts
import { Request, Response, NextFunction, RequestHandler } from "express";
import { NuevoDato as GuardarNuevoDato, ExisteColumna } from "../services/ValidadorArchivosService";
import { ObtenerTodosLosRegistros } from "../services/ValidadorArchivosService";
import { VerificarColumnasLista } from "../services/ValidadorArchivosService";

/**
 * Controlador para verificar si una o más columnas existen en la base de datos.
 * Devuelve un JSON con las columnas existentes y las nuevas.
 */
export const VerificarColumnasController: RequestHandler = async (req, res, next) => {
  try {
    let columns: string[] = [];

    // Identifica si el cuerpo contiene un solo nombre o múltiples columnas
    if (req.body.columns && Array.isArray(req.body.columns)) {
      columns = req.body.columns;
    } else if (req.body.ColumnName && typeof req.body.ColumnName === "string") {
      columns = [req.body.ColumnName]; // Convierte el valor único en un arreglo
    } else {
      res.status(400).json({ error: "Se requiere una columna o un arreglo de columnas." });
      return;
    }

    // Llama al servicio para verificar las columnas
    const result = await VerificarColumnasLista(columns);

    res.status(200).json(result);
  } catch (error) {
    next(error); // Asegúrate de pasar el error al middleware global
  }
};




/**
 * Controlador para guardar nuevas columnas en la base de datos.
 * Valida los datos antes de guardarlos.
 */
export const NuevoDatoController: RequestHandler = async (req, res, next) => {
  try {
    const classifications = req.body.classifications;

    if (!classifications || !Array.isArray(classifications)) {
      res.status(400).json({ error: "Se requiere un arreglo de clasificaciones." });
      return; // Detener la ejecución después de enviar la respuesta
    }

    await GuardarNuevoDato(classifications);

    res.status(201).json({ message: "Columnas registradas con éxito." });
    return; // Detener la ejecución después de enviar la respuesta
  } catch (error) {
    next(error); // Asegúrate de pasar el error al middleware de manejo de errores
  }
};

/**
 * Controlador para obtener todos los registros de la tabla ValidadorArchivos.
 */
export const ObtenerTodosController: RequestHandler = async (req, res, next) => {
  try {
    const registros = await ObtenerTodosLosRegistros();
    res.status(200).json(registros); // Devuelve los registros como JSON
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
};
