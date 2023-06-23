import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('payment', function (table) {
    table
      .enum('status', ['confirmed', 'pending', 'rejected', 'cancelled'])
      .alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('payment', function (table) {
    table.enum('status', ['confirmed', 'pending']).alter();
  });
}
