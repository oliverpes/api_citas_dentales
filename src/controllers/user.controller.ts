import { Request, Response } from 'express';
import { poolPromise } from '../db';
import bcrypt from 'bcryptjs';

// Obtener usuarios registrados desde la base de datos
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(
      'SELECT id, username, role FROM users' // No se devuelve la contraseña
    );
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Crear nuevo usuario
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const pool = await poolPromise;

    // Verificar si el usuario ya existe
    const existe = await pool.request()
      .input('username', username)
      .query('SELECT * FROM users WHERE username = @username');

    if (existe.recordset.length > 0) {
      return res.status(409).json({ error: 'El usuario ya existe' });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario
    await pool.request()
      .input('username', username)
      .input('password', hashedPassword)
      .input('role', role)
      .query(`
        INSERT INTO users (username, passwordHash, role)
        VALUES (@username, @password, @role)
      `);

    res.status(201).json({ message: 'Usuario creado correctamente' });

  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};
