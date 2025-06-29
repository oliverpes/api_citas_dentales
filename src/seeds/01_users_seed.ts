// src/seeds/01_users_seed.ts
import type { Knex } from 'knex';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();

  const hash = await bcrypt.hash('admin123', 10);

  await knex('users').insert([
    {
      username: 'admin',
      passwordHash: hash,
      role: 'admin'
    }
  ]);

  console.log('✅ Usuario admin seeded con hash:', hash);
}
