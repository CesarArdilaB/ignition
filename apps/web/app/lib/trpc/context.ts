import type { inferAsyncReturnType } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export async function createContext(opts: FetchCreateContextFnOptions) {
  return {
    // Add any context properties you need here
    headers: opts.req.headers,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>; 