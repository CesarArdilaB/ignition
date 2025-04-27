import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from 'database';

// Create a database connection
const sqlite = new Database('db.sqlite');

// Create the drizzle database instance with schema type
export const db = drizzle(sqlite, {
  schema: {
    ...schema,
  },
  logger: true,
});

// Export tables
export const tables = {
  example: schema.example,
} as const;

// Ensure the database is properly closed when the app exits
process.on('exit', () => {
  sqlite.close();
}); 