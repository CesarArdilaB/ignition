import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import type { SQL } from 'drizzle-orm';
import type { DatabaseAdapter, DatabaseConfig } from './types';

export class SQLiteAdapter implements DatabaseAdapter {
  private client;
  private db;

  constructor(config: DatabaseConfig) {
    this.client = createClient({
      url: config.url,
      authToken: config.authToken,
    });
    this.db = drizzle(this.client);
  }

  async connect(): Promise<void> {
    // Connection is established on first query
    await this.client.execute('SELECT 1');
  }

  async disconnect(): Promise<void> {
    await this.client.close();
  }

  async execute<T = unknown>(query: SQL): Promise<T[]> {
    const result = await this.client.execute(query.toString());
    return result.rows as T[];
  }

  async transaction<T>(callback: (tx: DatabaseAdapter) => Promise<T>): Promise<T> {
    return this.client.transaction(async (tx) => {
      const txAdapter: DatabaseAdapter = {
        ...this,
        execute: async <U>(query: SQL) => {
          const result = await tx.execute(query.toString());
          return result.rows as U[];
        },
      };
      return callback(txAdapter);
    });
  }
} 