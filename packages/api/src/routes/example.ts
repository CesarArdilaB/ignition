import { router, publicProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { db } from "../db";

import * as schema from "database";
import { z } from "zod";

export const exampleRouter = router({
	mutation: router({
		create: publicProcedure
			.input(schema.insertExampleSchema)
			.mutation(async ({ input }) => {
				return await db.insert(schema.example).values(input).execute();
			}),
	}),

  update: publicProcedure
    .input(schema.updateExampleSchema)
    .mutation(async ({ input }) => {
      if (!input.id) {
        throw new Error("ID is required for update");
      }
      return await db.update(schema.example).set(input).where(eq(schema.example.id, input.id)).execute();
    }),

    getById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.select().from(schema.example).where(eq(schema.example.id, input)).execute();
    }),

    getAll: publicProcedure
    .query(async () => {
      return await db.select().from(schema.example).execute();
    }),
});
