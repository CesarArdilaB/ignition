import { initTRPC } from '@trpc/server';
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export interface Context {
  headers: Headers;
}

export async function createContext(opts: FetchCreateContextFnOptions): Promise<Context> {
  return {
    headers: opts.req.headers,
  };
}

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;