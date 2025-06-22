import express from 'express';
import cors from 'cors';
import citaRoutes from './routes/cita.routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
console.log("prueba");

app.get('/', (_req, res) => {
  res.send('API de citas dentales: punto de inicio. Usa /api/citas');
});


app.use('/api/citas', citaRoutes);
app.use(errorHandler);
console.log("prueba",citaRoutes );
app.listen(PORT, () => {
  console.log(`Servidor API corriendo en http://localhost:${PORT}`);
});
