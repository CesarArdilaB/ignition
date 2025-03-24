import { beforeAll, afterAll, vi } from 'vitest';
import { db } from '../src';
import Database from 'better-sqlite3';

// Mock better-sqlite3
vi.mock('better-sqlite3', () => {
  return {
    default: vi.fn(() => ({
      prepare: vi.fn(),
      exec: vi.fn(),
      transaction: vi.fn(),
      close: vi.fn(),
    })),
  };
});

// Mock drizzle-orm
vi.mock('drizzle-orm/better-sqlite3', () => ({
  drizzle: vi.fn(() => ({
    insert: vi.fn(),
    select: vi.fn(),
    delete: vi.fn(),
    update: vi.fn(),
    transaction: vi.fn(),
  })),
}));

beforeAll(() => {
  // Reset all mocks before tests
  vi.resetAllMocks();
});

afterAll(() => {
  // Clean up after all tests
  vi.restoreAllMocks();
}); 