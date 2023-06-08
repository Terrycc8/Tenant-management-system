import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable('user'))) {
    await knex.schema.createTable('user', (table) => {
      table.increments('id');
      table.string('email', 128).notNullable().unique();
      table.specificType('password_hash', 'char(60)').notNullable();
      table.text('avatar').notNullable();
      table.string('first_name', 10).notNullable();
      table.string('last_name', 10).notNullable();
      table.string('status', 32).notNullable();
      table.timestamp('status_update_time').notNullable();
      table.enum('user_type', ['landlord', 'tenant', 'admin']).notNullable();
      table.timestamp('last_login_time').notNullable();
      table.timestamp('registered_at').notNullable();
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable('property'))) {
    await knex.schema.createTable('property', (table) => {
      table.increments('id');
      table.string('area', 16).notNullable();
      table.string('district', 16).notNullable();
      table.string('location', 16).notNullable();
      table.string('street', 16).notNullable();
      table.string('building', 16).notNullable();
      table.string('block', 4).notNullable();
      table.string('floor', 2).notNullable();
      table.string('room', 2).notNullable();
      table.string('Rent', 16).notNullable();
      table
        .integer('landlord_id')
        .unsigned()
        .notNullable()
        .references('user.id');
      table.integer('tenant_id').unsigned().notNullable().references('user.id');
      table.timestamp('rental_start_at').notNullable();
      table.timestamp('rental_end_at').notNullable();
      table.timestamp('created_at').notNullable();
    });
  }

  if (!(await knex.schema.hasTable('chatroom'))) {
    await knex.schema.createTable('chatroom', (table) => {
      table.increments('id');
      table
        .integer('creator_id')
        .unsigned()
        .notNullable()
        .references('user.id');
      table
        .integer('receiver_id')
        .unsigned()
        .notNullable()
        .references('user.id');
      table.timestamp('created_at').notNullable();
    });
  }

  if (!(await knex.schema.hasTable('message'))) {
    await knex.schema.createTable('message', (table) => {
      table.increments('id');
      table
        .integer('room_id')
        .unsigned()
        .notNullable()
        .references('chatroom.id');
      table.integer('sender_id').unsigned().notNullable().references('user.id');
      table.text('content').notNullable();
      table.timestamp('created_at').notNullable();
    });
  }

  if (!(await knex.schema.hasTable('payment'))) {
    await knex.schema.createTable('payment', (table) => {
      table.increments('id');
      table
        .integer('property_id')
        .unsigned()
        .notNullable()
        .references('property.id');
      table.timestamp('billing_period_from').notNullable();
      table.timestamp('billing_period_to').notNullable();
      table.integer('payer_id').unsigned().notNullable().references('user.id');
      table.enum('status', ['confirmed', 'pending']).notNullable();
      table
        .integer('created_by_id')
        .unsigned()
        .notNullable()
        .references('user.id');
      table.timestamp('created_at').notNullable();
      table
        .integer('confirmed_by_id')
        .unsigned()
        .notNullable()
        .references('user.id');
      table.timestamp('confirmed_at').notNullable();
    });
  }

  if (!(await knex.schema.hasTable('complaint'))) {
    await knex.schema.createTable('complaint', (table) => {
      table.increments('id');
      table.string('description', 60).notNullable();
      table
        .enum('type', ['maintenance', 'notices', 'reimbursement', 'complaint'])
        .notNullable();
      table.enum('priority', ['high', 'medium', 'low']).notNullable();
      table.enum('status', ['resolved', 'pending', 'rejected']).notNullable();
      table.text('content').notNullable();
      table.text('reason').notNullable();
      table
        .integer('property_id')
        .unsigned()
        .notNullable()
        .references('property.id');
      table
        .integer('handled_by_id')
        .unsigned()
        .notNullable()
        .references('user.id');
      table.timestamp('handled_at').notNullable();
      table
        .integer('created_by_id')
        .unsigned()
        .notNullable()
        .references('user.id');
      table.timestamp('created_at').notNullable();
    });
  }

  if (!(await knex.schema.hasTable('paymentAttachments'))) {
    await knex.schema.createTable('paymentAttachments', (table) => {
      table.increments('id');
      table.text('attachments').notNullable();
      table
        .integer('payment_id')
        .unsigned()
        .notNullable()
        .references('payment.id');
      table.timestamps(false, true);
    });
  }
  if (!(await knex.schema.hasTable('propertyAttachments'))) {
    await knex.schema.createTable('propertyAttachments', (table) => {
      table.increments('id');
      table.text('attachments').notNullable();
      table
        .integer('property_id')
        .unsigned()
        .notNullable()
        .references('property.id');
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable('complaintAttachments'))) {
    await knex.schema.createTable('complaintAttachments', (table) => {
      table.increments('id');
      table.text('attachments').notNullable();
      table
        .integer('complaint_id')
        .unsigned()
        .notNullable()
        .references('complaint.id');
      table.timestamps(false, true);
    });
  }

  if (!(await knex.schema.hasTable('log'))) {
    await knex.schema.createTable('log', (table) => {
      table.increments('id');
      table.text('user_agent').notNullable();
      table.text('url').notNullable();
      table.string('method', 16).notNullable();
      table.timestamps(false, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('log');
  await knex.schema.dropTableIfExists('property');
  await knex.schema.dropTableIfExists('paymentAttachments');
  await knex.schema.dropTableIfExists('complaint');
  await knex.schema.dropTableIfExists('payment');
  await knex.schema.dropTableIfExists('message');
  await knex.schema.dropTableIfExists('chatroom');
  await knex.schema.dropTableIfExists('complaintAttachments');
  await knex.schema.dropTableIfExists('propertyAttachments');
  await knex.schema.dropTableIfExists('user');
}
