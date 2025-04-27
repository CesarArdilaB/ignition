import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

export const example = sqliteTable('example', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const selectExampleSchema = createSelectSchema(example);
export const insertExampleSchema = createInsertSchema(example);
export const updateExampleSchema = createInsertSchema(example).partial();
export type Example = z.infer<typeof selectExampleSchema>;
export type NewExample = z.infer<typeof insertExampleSchema>;