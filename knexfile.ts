import 'dotenv/config'
import type { Knex } from 'knex'

const config: Record<string, Knex.Config> = {
  development: {
    client: 'mssql',
    connection: {
      server: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? '1433'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      options: {
        enableArithAbort: true,
        encrypt: false
      }
    },
    migrations: { directory: './migrations' },
    seeds: { directory: './src/seeds' }
  }
}

export default config
