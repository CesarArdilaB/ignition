import { describe, it, expect } from 'vitest';
import { insertExampleSchema } from '../../src/schema/example';

describe('Example Schema Validation', () => {
  describe('Example Schema', () => {
    it('should validate a valid example', () => {
      const validExample = {
        id: 'example123',
        name: 'Example',
        description: 'Example description'
      };

      const result = insertExampleSchema.safeParse(validExample);
      expect(result.success).toBe(true);
    });

    it('should fail on invalid example', () => {
      const invalidExample = {
        slug: 'example'
        // missing required name field
      };

      const result = insertExampleSchema.safeParse(invalidExample);
      expect(result.success).toBe(false);
    });
  });
}); 