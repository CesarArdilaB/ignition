import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from 'auth-db';
import { users, sessions, accounts, verifications } from 'auth-db/src/schema';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: users,
      session: sessions,
      account: accounts,
      verification: verifications
    }
  }),
  emailAndPassword: { enabled: true },
  // You can add socialProviders here if needed
});

export type Auth = typeof auth;
export const { getSession, signInEmail: login, signOut: logout, signUpEmail: register } = auth.api;