import type { SQL } from 'drizzle-orm';

export interface DatabaseAdapter {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  execute<T = unknown>(query: SQL): Promise<T[]>;
  transaction<T>(callback: (tx: DatabaseAdapter) => Promise<T>): Promise<T>;
}

export interface DatabaseConfig {
  url: string;
  authToken?: string;
} 