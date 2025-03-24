import { describe, it, expect } from 'vitest';
import { insertCategorySchema, insertProductSchema, insertVariantSchema } from '../../src/schema/catalog';

describe('Catalog Schema Validation', () => {
  describe('Category Schema', () => {
    it('should validate a valid category', () => {
      const validCategory = {
        id: 'cat123',
        name: 'Electronics',
        slug: 'electronics',
        description: 'Electronic devices and accessories'
      };

      const result = insertCategorySchema.safeParse(validCategory);
      expect(result.success).toBe(true);
    });

    it('should fail on invalid category', () => {
      const invalidCategory = {
        slug: 'electronics'
        // missing required name field
      };

      const result = insertCategorySchema.safeParse(invalidCategory);
      expect(result.success).toBe(false);
    });
  });

  describe('Product Schema', () => {
    it('should validate a valid product', () => {
      const validProduct = {
        id: 'prod123',
        categoryId: 'cat123',
        name: 'Smartphone',
        slug: 'smartphone',
        description: 'Latest smartphone model',
        status: 'draft' as const
      };

      const result = insertProductSchema.safeParse(validProduct);
      expect(result.success).toBe(true);
    });

    it('should fail on invalid product status', () => {
      const invalidProduct = {
        id: 'prod123',
        categoryId: 'cat123',
        name: 'Smartphone',
        slug: 'smartphone',
        status: 'invalid-status' // invalid status
      };

      const result = insertProductSchema.safeParse(invalidProduct);
      expect(result.success).toBe(false);
    });
  });

  describe('Variant Schema', () => {
    it('should validate a valid variant', () => {
      const validVariant = {
        id: 'var123',
        productId: 'prod123',
        sku: 'PHONE-123',
        name: '128GB Black',
        price: 999.99,
        stockQuantity: 10
      };

      const result = insertVariantSchema.safeParse(validVariant);
      expect(result.success).toBe(true);
    });

    it('should fail on invalid price', () => {
      const invalidVariant = {
        id: 'var123',
        productId: 'prod123',
        sku: 'PHONE-123',
        name: '128GB Black',
        price: 'not-a-number', // invalid price
        stockQuantity: 10
      };

      const result = insertVariantSchema.safeParse(invalidVariant);
      expect(result.success).toBe(false);
    });
  });
}); 