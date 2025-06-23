import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export interface UserPayload {
  id: number;
  role: 'admin' | 'recepcionista';
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const auth = req.headers.authorization;
  if (!auth) {
    res.status(401).json({ error: 'No autorizado' });
    return;
  }

  const [, token] = auth.split(' ');
  try {
    const payload = jwt.verify(token, JWT_SECRET) as UserPayload;
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
    return;
  }
}

export function requireRole(role: 'admin' | 'recepcionista') {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role !== role) {
      res.status(403).json({ error: 'Permiso denegado' });
      return;
    }
    next();
  };
}
