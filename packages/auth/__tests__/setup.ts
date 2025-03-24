import { beforeAll, afterAll, vi } from 'vitest';
import { db } from 'auth-db';

// Mock the database
vi.mock('auth-db', () => ({
  db: {
    query: vi.fn(),
    transaction: vi.fn(),
  },
}));

beforeAll(() => {
  // Reset all mocks before each test
  vi.resetAllMocks();
});

afterAll(() => {
  // Clean up after all tests
  vi.restoreAllMocks();
}); 