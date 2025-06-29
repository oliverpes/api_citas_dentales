import knex from 'knex'
import config from '../knexfile';
import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

// Se separa el host y la instancia si existe
const [server, instanceName] = process.env.DB_HOST?.split('\\') || [];

// Construir configuración para mssql
const dbConfig: sql.config = {
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  server: server || 'localhost',    // solo host sin instancia
  port: parseInt(process.env.DB_PORT || '1433'), // usualmente 1433 o puedes omitir si usas instancia
  database: process.env.DB_NAME!,
  options: {
    trustServerCertificate: true,
    encrypt: false, // generalmente false para SQL Server local
    ...(instanceName && { instanceName }) // pasa la instancia si existe
  },
  connectionTimeout: 30000,
  requestTimeout: 30000,
};

// exportas la promesa de conexión para usar en toda la app
export const poolPromise = sql.connect(dbConfig);
