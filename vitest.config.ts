/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Global coverage settings
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'coverage/**',
        'dist/**',
        '**/node_modules/**',
        '**/__tests__/**',
        '**/*.d.ts',
      ],
    },
    // Use threads for better isolation
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    // Run tests sequentially to avoid conflicts
    sequence: {
      hooks: 'list',
    },
  },
}); 