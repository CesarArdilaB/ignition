import { z } from 'zod';
import { router, publicProcedure } from './trpc';
import { exampleRouter } from './routes/example';

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

  catalog: exampleRouter,
});

export type AppRouter = typeof appRouter; 