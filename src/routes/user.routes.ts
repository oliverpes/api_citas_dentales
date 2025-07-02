// src/routes/user.routes.ts
import { Router } from 'express';
import { getUsers, createUser } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/', authMiddleware, getUsers);
router.post('/', authMiddleware, createUser);

export default router;
