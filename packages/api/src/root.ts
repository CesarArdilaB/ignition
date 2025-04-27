import { router } from './trpc';
import { exampleRouter } from './routes/example';
import { aiRouter } from './routes/ai';
import { authRouter } from './routes/auth';

export const appRouter = router({
  catalog: exampleRouter,
  ai: aiRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;