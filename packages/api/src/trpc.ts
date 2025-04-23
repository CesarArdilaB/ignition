import { initTRPC, TRPCError } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { getSession } from 'auth'; // Import getSession
import type { Session, User } from 'better-auth'; // Import Session and User types

// Define the structure returned by getSession
interface GetSessionResult {
  session: Session;
  user: User;
}

export interface Context {
  req: Request; // Include the full request object
  resHeaders: Headers; // Add response headers object
  // Store the result of getSession, which might be null
  sessionResult: GetSessionResult | null;
}

export async function createContext(opts: FetchCreateContextFnOptions): Promise<Context> {
  // Get session here so it's available in all procedures
  const sessionResult = await getSession({ headers: opts.req.headers });
  return {
    req: opts.req,
    resHeaders: opts.resHeaders, // Pass response headers from options
    sessionResult, // Store the full result
  };
}

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

// Middleware to check for authentication
const isAuthenticated = t.middleware(({ ctx, next }) => {
  // Check if sessionResult and the nested user exist
  if (!ctx.sessionResult || !ctx.sessionResult.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      ...ctx,
      // Pass the non-null sessionResult to the protected procedure context
      sessionResult: ctx.sessionResult,
    },
  });
});

// Protected procedure using the middleware
export const protectedProcedure = t.procedure.use(isAuthenticated);