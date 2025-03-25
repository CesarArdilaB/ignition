/// <reference types="vitest" />
import { defineProject, mergeConfig } from 'vitest/config';
import configShared from '../../vitest.shared';

export default mergeConfig(
  configShared,
  defineProject({
    test: {
      name: 'auth',
      setupFiles: ['__tests__/setup.ts'],
      include: ['__tests__/**/*.{test,spec}.{js,ts}']
    }
  })
); 