import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import citaRoutes from './routes/cita.routes';
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import { authMiddleware } from './middlewares/auth';

/* se levanta el puerto para el local*/
const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());
/* rutas de accesso al api */
app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api/users', userRoutes);
//console.log(userRoutes, "test-to-see-result");
app.use('/api/citas', citaRoutes);
app.use(errorHandler);

app.get('/', (_req, res) => {
  res.send('API de citas dentales: punto de inicio. Usa /api/citas');
});

 app.get('/whoami', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});
//console.log(userRoutes);

/* verificar cual es el puerto */
//console.log("prueba",citaRoutes );
app.listen(PORT, () => {
  console.log(`Servidor API corriendo en http://localhost:${PORT}`);
});
