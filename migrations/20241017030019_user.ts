import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user', table => {
    table.increments('id').primary().unique().comment('Identificador único do usuário');
    table.string('username').notNullable().comment('Nome de usuário');
    table.string('email').notNullable().comment('E-mail do usuário');
    table.boolean('is_company').defaultTo(false).comment('Indica se o usuário é uma empresa');
    table.timestamp('created_at').defaultTo(knex.fn.now()).comment('Data e hora de criação do usuário');
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTableIfExists('user');
}
