import { z } from 'zod';
import { router, publicProcedure } from './trpc';
import { catalogRouter } from './routes/catalog';

export const appRouter = router({
  hello: publicProcedure
    .query(() => {
      return {
        greeting: 'Hello from the API!',
      };
    }),
    
  echo: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        message: `You said: ${input.text}`,
      };
    }),

  catalog: catalogRouter,
});

export type AppRouter = typeof appRouter; 