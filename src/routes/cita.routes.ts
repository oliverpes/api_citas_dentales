import { Router } from 'express';
import { obtenerCitas, crearCita, eliminarCita } from '../controllers/cita.controller';

const router = Router();

router.get('/', obtenerCitas);
router.post('/', crearCita);
router.delete('/:id', eliminarCita);

export default router;
