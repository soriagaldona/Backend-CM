import { Router } from "express";
import {
  NuevoDatoController,
  VerificarColumnasController,
  ObtenerTodosController,
} from "../controllers/ValidadorArchivosControllers";

const router = Router();

// Ruta para verificar columnas existentes y nuevas
router.post("/ValidarColumnas", VerificarColumnasController);

// Ruta para clasificar y crear nuevas columnas
router.post("/NuevaColumna", NuevoDatoController);

// Ruta para obtener todos los registros
router.get("/ObtenerTodos", ObtenerTodosController);

export default router;
