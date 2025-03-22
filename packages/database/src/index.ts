import type { DatabaseAdapter } from './adapters/types';

// Adapters
export { SQLiteAdapter } from './adapters/sqlite';
export { PostgresAdapter } from './adapters/postgres';
export type { DatabaseAdapter, DatabaseConfig } from './adapters/types';

// Schema
export * from './schema/catalog';

// Factory function to create a database instance
export function createDatabase(adapter: DatabaseAdapter): DatabaseAdapter {
  return adapter;
} 