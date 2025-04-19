import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../../.env' }); // Load .env from root

export default defineConfig({
  schema: './packages/auth-db/src/schema.ts',
  out: './packages/auth-db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL || '',
  },
});