import { Request, Response } from 'express';
import { users, User, Role } from '../models/user.model';
import bcrypt from 'bcrypt';

export const getUsers = (_req: Request, res: Response) => {
  res.json(users.map(u => ({ id: u.id, username: u.username, role: u.role })));
};
