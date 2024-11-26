import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('vote', table => {
    table.increments('id').primary().unique().comment('Identificador único do voto');
    table.integer('user_id').notNullable();
    table.integer('idea_id').notNullable();
    table.boolean('is_upvote').defaultTo(true).comment('Indica se é um upvote (true) ou um downvote (false)');
    table.timestamp('created_at').defaultTo(knex.fn.now()).comment('Data e hora do voto');
  });
}


export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTableIfExists('vote');
}
