import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './packages/auth-db/src/schema.ts',
  out: './packages/auth-db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  },
});