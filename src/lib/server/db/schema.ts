import {sqliteTable, text, integer, } from "drizzle-orm/sqlite-core";
import type {DrizzleD1Database} from "drizzle-orm/d1/driver";
import {and, eq} from "drizzle-orm";

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
    hash: text('hash').notNull().unique(),
    pdp: text('pdp'),
    status: integer('status').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const getUserHypotheses = async (userId:string, db:DrizzleD1Database) =>
    await db.select().from(hypothesesTable).where(eq(hypothesesTable.userId, userId)).all();

export const getUserHypothesisById = async (userId:string, id:number, db:DrizzleD1Database) =>
    await db.select().from(hypothesesTable).where(and(eq(hypothesesTable.userId, userId), eq(hypothesesTable.id, id))).then(h=>h[0]);

export const getArgumentByHash = async (hash: string, db: DrizzleD1Database) => {
    return db.select().from(argumentsTable).where(eq(argumentsTable.hash, hash)).then(res => res[0]);
}

export const createArgument = async (data: { argument: string, pdp: string, status: number, hash: string}, db: DrizzleD1Database) => {
    return db.insert(argumentsTable).values({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
    }).returning().then(res => res[0]);
}

export const getArgumentById = async (id: number, db: DrizzleD1Database) => {
    return db.select().from(argumentsTable).where(eq(argumentsTable.id, id)).then(res => res[0]);
}

export const listArguments = async (db: DrizzleD1Database) => {
    return db.select().from(argumentsTable).all();
}

export const updateArgument = async (id: number, data: { argument?: string, pdp?: string, status?: number, hash?: string }, db: DrizzleD1Database) => {
    return db.update(argumentsTable).set({
        ...data,
        updatedAt: new Date(),
    }).where(eq(argumentsTable.id, id)).returning().then(res => res[0]);
}

export const deleteArgument = async (id: number, db: DrizzleD1Database) => {
    return db.delete(argumentsTable).where(eq(argumentsTable.id, id)).returning().then(res => res[0]);
}

