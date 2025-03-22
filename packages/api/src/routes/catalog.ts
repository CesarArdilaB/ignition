import { router, publicProcedure } from '../trpc';
import { db } from '../db';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import * as schema from 'database';

export const catalogRouter = router({
  // Queries
  getCategories: publicProcedure
    .query(async () => {
      return await db.select().from(schema.categories);
    }),

  getProductsByCategory: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      return await db.select().from(schema.products).where(eq(schema.products.categoryId, input));
    }),

  getProductWithVariants: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const product = await db.select().from(schema.products).where(eq(schema.products.id, input)).limit(1);

      if (!product.length) {
        throw new Error('Product not found');
      }

      const variants = await db.select().from(schema.variants).where(eq(schema.variants.productId, input));

      return {
        ...product[0],
        variants
      };
    })
}); 