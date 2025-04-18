import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { login, register, logout, getSession } from 'auth';
import type { Session, User } from 'better-auth';

interface GetSessionResult {
  session: Session;
  user: User;
}

export const authRouter = router({
  register: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(8), name: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const result = await register({ body: input });
        return { success: true, userId: result.user.id };
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({ code: 'BAD_REQUEST', message: error.message });
        }
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Registration failed' });
      }
    }),

  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const result = await login({ body: input });
        return { success: true, userId: result.user.id };
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({ code: 'UNAUTHORIZED', message: error.message });
        }
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Login failed' });
      }
    }),

  logout: protectedProcedure
    .mutation(async ({ ctx }) => {
      const headers = ctx.req.headers;
      try {
        await logout({ headers });
        return { success: true };
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
        }
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Logout failed' });
      }
    }),

  getCurrentSession: publicProcedure
    .query(({ ctx }): GetSessionResult | null => {
      return ctx.sessionResult;
    }),
}); 