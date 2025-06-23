import { Router } from 'express';
import { getUsers } from '../controllers/user.controller';
import { authMiddleware, requireRole } from '../middlewares/auth';

const router = Router();
router.use(authMiddleware, requireRole('admin'));
router.get('/', getUsers);

export default router;
