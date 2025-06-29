import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', t => {
    t.increments('id').primary();
    t.string('username').notNullable().unique();
    t.string('passwordHash').notNullable();
    t.string('role').notNullable();
  });
  await knex.schema.createTable('citas', t => {
    t.increments('id').primary();
    t.string('paciente').notNullable();
    t.date('fecha').notNullable();
    t.string('motivo').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('citas');
  await knex.schema.dropTableIfExists('users');
}
