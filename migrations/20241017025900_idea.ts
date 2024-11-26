import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTableIfNotExists('idea', table => {
    table.increments('id').primary().unique().comment('Identificador único da ideia');
    table.string('title').notNullable().comment('Título da ideia');
    table.string('description').notNullable().comment('Descrição da ideia');
    table.string('status').nullable().defaultTo(null).comment('Status da ideia (e.g. nova, em desenvolvimento, concluída)');
    table.boolean('is_pinned').defaultTo(false).comment('Indica se a ideia está fixada no topo');
    table.timestamp('created_at').defaultTo(knex.fn.now()).comment('Data e hora de criação da ideia');
    table.timestamp('updated_at').defaultTo(knex.fn.now()).comment('Data e hora da última atualização da ideia');
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTableIfExists('idea');
}
