import { Request, Response } from 'express';
import { users, User, Role } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password, role } = req.body as { username: string; password: string; role: Role };

  if (!['admin', 'recepcionista'].includes(role)) {
    res.status(400).json({ error: 'Rol inválido' });
    return;
  }

  if (users.find(u => u.username === username)) {
    res.status(400).json({ error: 'Usuario ya existe' });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser: User = { id: Date.now(), username, passwordHash, role };
  users.push(newUser);

  res.status(201).json({ id: newUser.id, username: newUser.username, role: newUser.role });
};


export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    res.status(401).json({ error: 'Credenciales inválidas' });
    return;
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
};
