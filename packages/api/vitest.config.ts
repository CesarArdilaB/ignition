/// <reference types="vitest" />
import { defineProject, mergeConfig } from 'vitest/config';
import { resolve } from 'node:path';
import configShared from '../../vitest.shared';

export default mergeConfig(
  configShared,
  defineProject({
    test: {
      name: 'api',
      setupFiles: ['__tests__/setup.ts'],
      include: ['__tests__/**/*.{test,spec}.{js,ts}']
    },
    resolve: {
      alias: {
        'ai': resolve(__dirname, '../ai/src'),
      },
    },
  })
); 