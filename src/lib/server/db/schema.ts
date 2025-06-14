import {sqliteTable, text, integer, } from "drizzle-orm/sqlite-core";

export const hypothesesTable = sqliteTable('hypotheses', {
    id: integer('id').primaryKey(),
    text: text('text').notNull(),
    userId: text('user_id').notNull(),
    context: text('context').notNull(),
    hash: text('hash').notNull(),
    status: integer('status').notNull().default(0),
    createdAt: integer('created_at', { mode: 'timestamp' }),
    updatedAt: integer('updated_at', { mode: 'timestamp' }),
});

export const argumentsTable = sqliteTable('arguments', {
    id: integer('id').primaryKey(),
    argument: text('argument').notNull(),
    refutation: text('refutation'),
    status: integer('status').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});