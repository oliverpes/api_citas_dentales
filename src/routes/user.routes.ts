import { Router } from 'express';
import { getUsers, createUser } from '../controllers/user.controller';

const router = Router();

// Ruta para obtener usuarios
router.get('/', getUsers);

// Ruta para crear nuevo usuario
router.post('/', createUser);

export default router;
