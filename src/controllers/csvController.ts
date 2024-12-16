// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.saveClassifications = exports.getClassifications = exports.uploadFile = void 0;
// const csvService_1 = require("../services/csvService");
// const path_1 = __importDefault(require("path"));
// const fs_1 = __importDefault(require("fs"));
// const columnClassifications_repository_1 = require("../repositories/columnClassifications.repository");
// /**
//  * Controlador para subir y procesar archivos CSV o Excel.
//  */
// const uploadFile = async (req, res) => {
//     try {
//         const file = req.file;
//         if (!file) {
//             return res.status(400).json({ error: 'No se ha subido ningún archivo.' });
//         }
//         // Validar tipo de archivo (ya manejado en service)
//         const filePath = path_1.default.join(__dirname, '../../', file.path);
//         const fileName = file.originalname;
//         const classifications = await (0, csvService_1.processFile)(filePath, fileName);
//         // Eliminar el archivo temporalmente almacenado
//         fs_1.default.unlink(filePath, (err) => {
//             if (err) {
//                 console.error('Error al eliminar el archivo:', err);
//             }
//         });
//         res.json({ message: 'Archivo procesado exitosamente.', classifications });
//     }
//     catch (error) {
//         console.error('Error en uploadFile:', error);
//         res.status(500).json({ error: error.message || 'Error al procesar el archivo.' });
//     }
// };
// exports.uploadFile = uploadFile;
// /**
//  * Controlador para obtener clasificaciones de columnas.
//  */
// const getClassifications = async (req, res) => {
//     try {
//         const { fileName } = req.query;
//         if (!fileName || typeof fileName !== 'string') {
//             return res.status(400).json({ error: 'El parámetro fileName es requerido y debe ser una cadena de texto.' });
//         }
//         // Obtener clasificaciones para el archivo especificado
//         const classifications = await (0, columnClassifications_repository_1.fetchColumnClassifications)([], fileName); // Ajustar según necesidad
//         res.json({ classifications });
//     }
//     catch (error) {
//         console.error('Error en getClassifications:', error);
//         res.status(500).json({ error: 'Error al obtener las clasificaciones de columnas.' });
//     }
// };
// exports.getClassifications = getClassifications;
// /**
//  * Controlador para guardar clasificaciones de columnas.
//  */
// const saveClassifications = async (req, res) => {
//     try {
//         const { fileName, classifications } = req.body;
//         if (!fileName || typeof fileName !== 'string') {
//             return res.status(400).json({ error: 'El campo fileName es requerido y debe ser una cadena de texto.' });
//         }
//         if (!classifications || typeof classifications !== 'object') {
//             return res.status(400).json({ error: 'El campo classifications es requerido y debe ser un objeto.' });
//         }
//         // Transformar el objeto de clasificaciones en una lista
//         const classificationList = Object.entries(classifications).map(([ColumnName, Classification]) => ({
//             ColumnName,
//             Classification: String(Classification),
//         }));
//         // Guardar clasificaciones en la base de datos
//         await (0, columnClassifications_repository_1.upsertColumnClassifications)(classificationList, fileName);
//         res.json({ message: 'Clasificaciones guardadas exitosamente.' });
//     }
//     catch (error) {
//         console.error('Error en saveClassifications:', error);
//         res.status(500).json({ error: 'Error al guardar las clasificaciones de columnas.' });
//     }
// };
// exports.saveClassifications = saveClassifications;
