import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('payment', function (table) {
    table.dropColumn('status');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('payment', function (table) {
    table.enum('status', ['confirmed', 'pending']).notNullable();
  });
}
