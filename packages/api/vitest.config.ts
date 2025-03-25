/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/__tests__/**/*.test.ts'],
    setupFiles: [resolve(__dirname, './__tests__/setup.ts')],
  },
  resolve: {
    alias: {
      'ai': resolve(__dirname, '../ai/src'),
    },
  },
}); 