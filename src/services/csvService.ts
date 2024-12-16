// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.processFile = void 0;
// // src/services/csvService.ts
// const papaparse_1 = __importDefault(require("papaparse"));
// const fs_1 = __importDefault(require("fs"));
// const path_1 = __importDefault(require("path"));
// const classifyColumn_1 = require("../utils/classifyColumn");
// const columnClassifications_repository_1 = require("../repositories/columnClassifications.repository");
// const xlsx_1 = __importDefault(require("xlsx"));
// const processFile = async (filePath, fileName) => {
//     try {
//         const fileExtension = path_1.default.extname(fileName).toLowerCase();
//         let columns = [];
//         let data = [];
//         if (fileExtension === '.csv') {
//             const csvData = fs_1.default.readFileSync(filePath, 'utf8');
//             const results = await new Promise((resolve, reject) => {
//                 papaparse_1.default.parse(csvData, {
//                     header: true,
//                     skipEmptyLines: true,
//                     complete: (results) => {
//                         resolve(results.data);
//                     },
//                     error: (error) => {
//                         reject(error);
//                     },
//                 });
//             });
//             data = results;
//             columns = Object.keys(results[0] || {});
//         }
//         else if (['.xls', '.xlsx'].includes(fileExtension)) {
//             const workbook = xlsx_1.default.readFile(filePath);
//             const sheetName = workbook.SheetNames[0];
//             const sheet = workbook.Sheets[sheetName];
//             const jsonData = xlsx_1.default.utils.sheet_to_json(sheet, { defval: '' });
//             data = jsonData;
//             columns = Object.keys(jsonData[0] || {});
//         }
//         else {
//             throw new Error('Formato de archivo no soportado. Solo se permiten CSV y Excel.');
//         }
//         if (columns.length === 0) {
//             throw new Error('El archivo no contiene columnas.');
//         }
//         // Obtener clasificaciones existentes
//         const existingClassifications = await (0, columnClassifications_repository_1.fetchColumnClassifications)(columns, fileName);
//         // Identificar columnas no clasificadas
//         const unclassifiedColumns = columns.filter(col => !existingClassifications[col]);
//         // Clasificación automática de columnas nuevas
//         const newClassifications = unclassifiedColumns.map(col => ({
//             ColumnName: col,
//             Classification: (0, classifyColumn_1.classifyColumn)(col),
//         }));
//         // Insertar o actualizar clasificaciones en la base de datos
//         if (newClassifications.length > 0) {
//             await (0, columnClassifications_repository_1.upsertColumnClassifications)(newClassifications, fileName);
//         }
//         // Combinar clasificaciones existentes y nuevas
//         const finalClassifications = {
//             ...existingClassifications,
//             ...newClassifications.reduce((acc, cl) => ({ ...acc, [cl.ColumnName]: cl.Classification }), {}),
//         };
//         return finalClassifications;
//     }
//     catch (error) {
//         console.error('Error en processFile:', error);
//         throw error;
//     }
// };
// exports.processFile = processFile;
