// src/routes/roleRoutes.ts
import { Router } from 'express';
import { getRoles } from '../controllers/role.controller';

const router = Router();

router.get('/roles', getRoles);

export default router;
