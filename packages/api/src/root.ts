import { router } from './trpc';
import { catalogRouter } from './routes/catalog';
import { aiRouter } from './routes/ai';

export const appRouter = router({
  catalog: catalogRouter,
  ai: aiRouter,
});

export type AppRouter = typeof appRouter;