import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  // Include all packages
  {
    test: {
      name: 'ai',
      root: './packages/ai',
      environment: 'node',
      globals: true,
      setupFiles: ['./__tests__/setup.ts'],
    },
  },
  {
    test: {
      name: 'api',
      root: './packages/api',
      environment: 'node',
      globals: true,
      setupFiles: ['./__tests__/setup.ts'],
    },
  },
  {
    test: {
      name: 'auth',
      root: './packages/auth',
      environment: 'node',
      globals: true,
      setupFiles: ['./__tests__/setup.ts'],
    },
  },
  {
    test: {
      name: 'auth-db',
      root: './packages/auth-db',
      environment: 'node',
      globals: true,
      setupFiles: ['./__tests__/setup.ts'],
    },
  },
  {
    test: {
      name: 'database',
      root: './packages/database',
      environment: 'node',
      globals: true,
      setupFiles: ['./__tests__/setup.ts'],
    },
  },
]); 