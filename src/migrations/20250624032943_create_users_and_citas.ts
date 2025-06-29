import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('username', 255).notNullable().unique();
    table.string('passwordHash', 255).notNullable();
    table.string('role', 50).notNullable();
  });

  await knex.schema.createTable('citas', table => {
    table.increments('id').primary();
    table.string('paciente', 255).notNullable();
    table.date('fecha').notNullable();
    table.string('motivo', 255).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('citas');
  await knex.schema.dropTableIfExists('users');
}
