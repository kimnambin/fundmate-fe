// ESLint 9 flat config 공통 베이스 (React + TypeScript 앱용).
// 앱의 eslint.config.js에서 `export default createReactConfig()`로 사용한다.
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

/** @param {{ tsconfigRootDir?: string }} [options] */
export const createReactConfig = ({ tsconfigRootDir } = {}) =>
  tseslint.config(
    { ignores: ['dist'] },
    {
      extends: [js.configs.recommended, ...tseslint.configs.recommended],
      files: ['**/*.{ts,tsx}'],
      languageOptions: {
        ecmaVersion: 2020,
        globals: globals.browser,
        ...(tsconfigRootDir && { parserOptions: { tsconfigRootDir } }),
      },
      plugins: {
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
      },
      rules: {
        'no-console': ['error', { allow: ['warn', 'error'] }],
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],
        // 밑줄로 시작하는 미사용 변수/인자는 의도된 것으로 본다.
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
      },
    },
  );
