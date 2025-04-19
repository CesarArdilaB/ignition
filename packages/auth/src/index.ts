import * as dotenv from 'dotenv';
dotenv.config({ path: '../../.env' }); // Load .env from root

import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from 'auth-db';
import { users, sessions, accounts, verifications } from 'auth-db/src/schema';

if (!process.env.SESSION_SECRET) {
  throw new Error('Missing SESSION_SECRET environment variable');
}

export const auth = betterAuth({
  secret: process.env.SESSION_SECRET, // Use the session secret
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