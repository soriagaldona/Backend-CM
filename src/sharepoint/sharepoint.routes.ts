// src/sharepoint/sharepoint.routes.ts

import { Router } from 'express';
import { sharepointController } from './sharepoint.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Test SharePoint connection
router.get('/test', authMiddleware, sharepointController.testConnection);

export default router;