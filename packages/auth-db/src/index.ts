import { drizzle } from 'drizzle-orm/node-postgres'; // Use node-postgres
// Use default import for pg (CommonJS module)
import pg from 'pg'; 
const { Pool } = pg; // Destructure Pool from the default import
import * as schema from './schema'; // Import all schemas
import * as dotenv from 'dotenv';

dotenv.config({ path: '../../.env' }); // Load .env from root for connection string

if (!process.env.POSTGRES_URL) {
  throw new Error('Missing POSTGRES_URL environment variable');
}

// Create the connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  // Add ssl configuration if needed for production/cloud databases
  // ssl: {
  //   rejectUnauthorized: false // Example for development/some cloud providers
  // }
});

// Pass the pool and schema to drizzle
export const db = drizzle(pool, { schema });