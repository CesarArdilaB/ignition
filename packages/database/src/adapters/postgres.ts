import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import type { SQL } from 'drizzle-orm';
import type { DatabaseAdapter, DatabaseConfig } from './types';

export class PostgresAdapter implements DatabaseAdapter {
  private client;
  private db;

  constructor(config: DatabaseConfig) {
    this.client = postgres(config.url, {
      max: 1,
    });
    this.db = drizzle(this.client);
  }

  async connect(): Promise<void> {
    // Connection is established on first query
    await this.client`SELECT 1`;
  }

  async disconnect(): Promise<void> {
    await this.client.end();
  }

  async execute<T = unknown>(query: SQL): Promise<T[]> {
    const result = await this.client.unsafe(query.toString());
    return result as T[];
  }

  async transaction<T>(callback: (tx: DatabaseAdapter) => Promise<T>): Promise<T> {
    return this.client.begin(async (tx) => {
      const txAdapter: DatabaseAdapter = {
        ...this,
        execute: async <U>(query: SQL) => {
          const result = await tx.unsafe(query.toString());
          return result as U[];
        },
      };
      return callback(txAdapter);
    });
  }
} 