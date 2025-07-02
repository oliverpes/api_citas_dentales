import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { poolPromise } from '../db';
import sql from 'mssql';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Faltan credenciales' });
    }

    const pool = await poolPromise;
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .query('SELECT * FROM users WHERE username = @username');

    const user = result.recordset[0];

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    console.log('🔍 Usuario desde DB:', user);

    const isValid = await bcrypt.compare(password, user.passwordHash);

    // Cambié user.password por user.passwordHash para que el log sea correcto
    console.log('Comparando contraseñas:', password, 'vs', user.passwordHash);
    console.log('¿Es válida?', isValid);

    if (!isValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
};

// Registro users
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ error: 'Faltan campos' });
    }

    const pool = await poolPromise;

    // Verificar si ya existe usuario
    const exists = await pool.request()
      .input('username', sql.VarChar, username)
      .query('SELECT * FROM users WHERE username = @username');

    if (exists.recordset.length > 0) {
      return res.status(400).json({ error: 'Usuario ya existe' });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario
    await pool.request()
      .input('username', sql.VarChar, username)
      .input('password', sql.VarChar, hashedPassword)
      .input('role', sql.VarChar, role)
      .query('INSERT INTO users (username, passwordHash, role) VALUES (@username, @password, @role)');

    return res.status(201).json({ message: 'Usuario registrado correctamente' });

  } catch (error) {
    console.error('Register error:', error);
    next(error);
  }
};
