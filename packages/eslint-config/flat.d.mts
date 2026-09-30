import type { Linter } from 'eslint';

export function createReactConfig(options?: {
  tsconfigRootDir?: string;
}): Linter.Config[];
