import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    exclude: ['**/node_modules/**', '**/dist/**'],
    sequence: {
      hooks: 'list'
    },
    isolate: true,
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true
      }
    }
  },
}); 