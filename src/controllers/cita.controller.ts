import { Request, Response } from 'express';
import { citas, Cita } from '../models/cita.model';

export const obtenerCitas = (_req: Request, res: Response) => {
  res.json(citas);
};

export const crearCita = (req: Request, res: Response) => {
  const nuevaCita: Cita = { id: Date.now(), ...req.body };
  citas.push(nuevaCita);
  res.status(201).json(nuevaCita);
};

export const eliminarCita = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = citas.findIndex(c => c.id === id);
  if (index !== -1) {
    citas.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Cita no encontrada' });
  }
};
