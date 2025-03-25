import { describe, it, expect } from 'vitest';
import { appRouter } from '../../src/router';
import { db, createTestContext } from '../setup';
import type { Category, Product, Variant } from 'database';

// Mock data
const mockCategories: Category[] = [
  {
    id: 'cat1',
    name: 'Category 1',
    description: 'Category 1 description',
    slug: 'category-1',
    createdAt: new Date('2025-03-25T00:01:50.269Z'),
  },
  {
    id: 'cat2',
    name: 'Category 2',
    description: 'Category 2 description',
    slug: 'category-2',
    createdAt: new Date('2025-03-25T00:01:50.269Z'),
  },
];

const mockProducts: Product[] = [
  {
    id: 'prod1',
    categoryId: 'cat1',
    name: 'Product 1',
    description: 'Product 1 description',
    slug: 'product-1',
    status: 'published',
    createdAt: new Date('2025-03-25T00:01:50.269Z'),
  },
  {
    id: 'prod2',
    categoryId: 'cat1',
    name: 'Product 2',
    description: 'Product 2 description',
    slug: 'product-2',
    status: 'published',
    createdAt: new Date('2025-03-25T00:01:50.269Z'),
  },
  {
    id: 'prod3',
    categoryId: 'cat2',
    name: 'Product 3',
    description: 'Product 3 description',
    slug: 'product-3',
    status: 'published',
    createdAt: new Date('2025-03-25T00:01:50.269Z'),
  },
];

const mockVariants: Variant[] = [
  {
    id: 'var1',
    productId: 'prod1',
    sku: 'SKU-1',
    name: 'Variant 1',
    price: 9.99,
    stockQuantity: 10,
    createdAt: new Date('2025-03-25T00:01:50.269Z'),
  },
  {
    id: 'var2',
    productId: 'prod1',
    sku: 'SKU-2',
    name: 'Variant 2',
    price: 19.99,
    stockQuantity: 5,
    createdAt: new Date('2025-03-25T00:01:50.269Z'),
  },
];

describe('Catalog Routes', () => {
  describe('GET /catalog/categories', () => {
    it('should return the categories list', async () => {
      db._setCategories(mockCategories);

      const result = await appRouter.createCaller(createTestContext()).catalog.getCategories();

      expect(result).toEqual(mockCategories);
    });
  });

  describe('GET /catalog/products/by-category/:categoryId', () => {
    it('should return products for a specific category', async () => {
      db._setProducts(mockProducts);

      const result = await appRouter.createCaller(createTestContext()).catalog.getProductsByCategory('cat1');

      expect(result).toEqual([mockProducts[0], mockProducts[1]]);
    });

    it('should return empty array for non-existent category', async () => {
      db._setProducts(mockProducts);

      const result = await appRouter.createCaller(createTestContext()).catalog.getProductsByCategory('non-existent');

      expect(result).toEqual([]);
    });
  });

  describe('GET /catalog/products/:productId', () => {
    it('should return a product with its variants', async () => {
      db._setProducts(mockProducts);
      db._setVariants(mockVariants);

      const result = await appRouter.createCaller(createTestContext()).catalog.getProductWithVariants('prod1');

      expect(result).toEqual({
        ...mockProducts[0],
        variants: mockVariants,
      });
    });

    it('should throw error for non-existent product', async () => {
      db._setProducts(mockProducts);
      db._setVariants(mockVariants);

      await expect(
        appRouter.createCaller(createTestContext()).catalog.getProductWithVariants('non-existent')
      ).rejects.toThrow('Product not found');
    });
  });
}); 