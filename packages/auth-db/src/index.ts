import { drizzle } from 'drizzle-orm/better-sqlite3'; // or 'pg' if using Postgres
import Database from 'better-sqlite3';
import { users, sessions, accounts, verifications } from './schema';

const sqlite = new Database('auth.db'); // adjust path as needed
export const db = drizzle(sqlite, { schema: { users, sessions, accounts, verifications } });