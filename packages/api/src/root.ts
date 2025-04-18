import { router } from './trpc';
import { catalogRouter } from './routes/catalog';
import { aiRouter } from './routes/ai';
import { authRouter } from './routes/auth';

export const appRouter = router({
  catalog: catalogRouter,
  ai: aiRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;