import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('comment', table => {
    table.increments('id').primary().unique().comment('Identificador único do comentário');
    table.integer('user_id').notNullable().comment('Identificador do usuário que comentou');
    table.integer('idea_id').notNullable().comment('Identificador da ideia comentada');
    table.text('content').notNullable().comment('Conteúdo do comentário');
    table.timestamp('created_at').defaultTo(knex.fn.now()).comment('Data e hora do comentário');
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTableIfExists('comment');
}
