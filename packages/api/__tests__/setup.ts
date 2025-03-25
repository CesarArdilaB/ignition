import { vi, beforeEach, beforeAll, afterAll } from 'vitest';
import type { Category, Product, Variant } from 'database';
import type { Context } from '../src/trpc';
import { eq } from 'drizzle-orm';
import * as schema from 'database';
import type { SQLiteTableWithColumns } from 'drizzle-orm/sqlite-core';

// Mock database
const createMockDb = () => {
  let mockCategories: Category[] = [];
  let mockProducts: Product[] = [];
  let mockVariants: Variant[] = [];
  let shouldThrowError = false;
  let currentTable: { name: string } | null = null;
  type WhereCondition = { field: string; value: unknown } | null;
  let currentWhere: WhereCondition = null;
  let currentLimit: number | null = null;

  const db = {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    execute: vi.fn().mockImplementation(async () => {
      // Handle errors first
      if (shouldThrowError) {
        throw new Error('Database error');
      }

      console.log('Current table:', currentTable);
      console.log('Mock categories:', mockCategories);

      let result: Array<Category | Product | Variant> = [];
      
      // Determine the table based on the schema object
      if (currentTable?.name === 'categories') {
        result = [...mockCategories];
      } else if (currentTable?.name === 'products') {
        result = [...mockProducts];
      } else if (currentTable?.name === 'variants') {
        result = [...mockVariants];
      }

      // Apply where condition if exists
      if (currentWhere?.field && currentWhere?.value) {
        result = result.filter(item => {
          // Convert snake_case to camelCase (e.g., category_id -> categoryId)
          const camelField = currentWhere?.field.split('_')
            .map((part, index) => index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1))
            .join('');
          return item[camelField as keyof typeof item] === currentWhere?.value;
        });
      }

      // Apply limit if exists
      if (currentLimit !== null) {
        result = result.slice(0, currentLimit);
      }

      // For getProductWithVariants, throw error if no product found after where and limit
      if (currentTable?.name === 'products' && currentLimit === 1 && result.length === 0) {
        throw new Error('Product not found');
      }

      console.log('Result:', result);

      // Reset query state
      currentWhere = null;
      currentLimit = null;

      return result;
    }),
    _setCategories: (categories: Category[]) => {
      console.log('Setting categories:', categories);
      mockCategories = categories;
    },
    _setProducts: (products: Product[]) => {
      mockProducts = products;
    },
    _setVariants: (variants: Variant[]) => {
      mockVariants = variants;
    },
    _setError: (error: boolean) => {
      shouldThrowError = error;
    }
  };

  // Mock from implementation
  db.from.mockImplementation((table) => {
    // Get the table name from the drizzle table object
    currentTable = { name: table[Symbol.for('drizzle:Name')] };
    console.log('Set current table:', currentTable);
    return db;
  });

  // Mock where implementation
  db.where.mockImplementation((condition) => {
    console.log('Where condition:', condition);
    if (condition.queryChunks?.[1]?.name) {
      // Handle eq function
      const field = condition.queryChunks[1].name;
      const value = condition.queryChunks[3].value;
      currentWhere = { field, value };
      console.log('Set where condition:', currentWhere);
    }
    return db;
  });

  // Mock limit implementation
  db.limit.mockImplementation((value) => {
    currentLimit = value;
    return db;
  });

  return db;
};

// Mock better-sqlite3
vi.mock('better-sqlite3', () => ({
  default: vi.fn(() => ({
    prepare: vi.fn(() => ({
      raw: vi.fn(),
      run: vi.fn(),
      get: vi.fn(),
      all: vi.fn(),
      finalize: vi.fn(),
    })),
    exec: vi.fn(),
    transaction: vi.fn(),
    close: vi.fn(),
  })),
}));

// Mock drizzle-orm
vi.mock('drizzle-orm/better-sqlite3', () => ({
  drizzle: vi.fn(() => db),
}));

// Mock the database module
vi.mock('../src/db', () => ({
  default: db,
  db: db,
}));

export const db = createMockDb();

// Create test context
export const createTestContext = (): Context => ({
  headers: new Headers(),
});

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
  process.env.OPENAI_API_KEY = 'test-api-key';
  db._setCategories([]);
  db._setProducts([]);
  db._setVariants([]);
  db._setError(false);
});

// Clear environment variables after all tests
afterAll(() => {
  process.env.OPENAI_API_KEY = undefined;
}); 