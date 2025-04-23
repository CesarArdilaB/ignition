import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { login, register, logout } from 'auth';
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
    .mutation(async ({ input, ctx }) => {
      try {
        const response = await login({
          headers: ctx.req.headers, // Pass request headers if needed by better-auth internally
          body: input,
          asResponse: true,
        });

        if (response.ok) {
          const setCookieHeader = response.headers.get('Set-Cookie');
          if (setCookieHeader) {
            ctx.resHeaders.set('Set-Cookie', setCookieHeader);
          }

          let userId = null;
          try {
            const data = await response.clone().json(); 
            userId = data?.user?.id ?? null;
          } catch (parseError) {
          }

          if (!userId) {
             throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Login succeeded but failed to retrieve user data.' });
          }

          return { success: true, userId: userId };
        }
        
        let errorMessage = `Login failed with status ${response.status}`;
        try {
            const errorBody = await response.json();
            errorMessage = errorBody?.message || errorMessage;
        } catch (e) { /* Ignore parsing error */ }
        throw new TRPCError({ code: 'UNAUTHORIZED', message: errorMessage });

      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });
        }
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Login failed due to an unexpected error.' });
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