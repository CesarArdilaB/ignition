// Import drizzle specifically for node-postgres
import { drizzle } from 'drizzle-orm/node-postgres';
// Import Pool from pg
import pg from 'pg';
const { Pool } = pg;

import * as schema from 'database';
import * as dotenv from 'dotenv';

// Load environment variables from root .env file
dotenv.config({ path: '../../.env' });

// Check for API_DATABASE_URL environment variable (for PostgreSQL)
if (!process.env.API_DATABASE_URL) {
  throw new Error('Missing API_DATABASE_URL environment variable for PostgreSQL connection');
}

// Use API_DATABASE_URL for the PostgreSQL Pool connection
const pool = new Pool({
  connectionString: process.env.API_DATABASE_URL,
  // Add SSL configuration if needed for your PostgreSQL instance
  // ssl: { rejectUnauthorized: false } 
});

// Pass the pool and schema to drizzle
export const db = drizzle(pool, {
  schema: {
    ...schema,
  },
  logger: true, // Keep logger if desired
});

// Export tables
export const tables = {
  example: schema.example,
} as const;

// Remove the specific sqlite exit handler
// process.on('exit', () => {
//   sqlite.close();
// }); 