// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// // src/routes/csvRoutes.ts
// const express_1 = require("express");
// const multer_1 = __importDefault(require("multer"));
// const csvController_1 = require("../controllers/csvController");
// const router = (0, express_1.Router)();
// const upload = (0, multer_1.default)({ dest: 'uploads/' });
// // Endpoint para subir archivos CSV o Excel
// router.post('/upload', upload.single('file'), csvController_1.uploadFile);
// // Endpoint para obtener clasificaciones de columnas
// router.get('/classifications', csvController_1.getClassifications);
// // Endpoint para guardar clasificaciones de columnas
// router.post('/classifications', csvController_1.saveClassifications);
// exports.default = router;
