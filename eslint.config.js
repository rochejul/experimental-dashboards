import js from '@eslint/js';
import globals from 'globals';

import prettier from 'eslint-plugin-prettier';

export const globalIgnores = {
  ignores: [
    '**/.*',
    '**/dist/**',
    '**/.parcel-cache/**',
    '**/node_modules/**',
    '**/build/**',
    '--help/**',
    '**/.husky/**',
    '**/.vscode/**',
    '**/images/**',
    '**/*.amd.js',
    '**/*.umd.js',
  ],
};

export const eslintRecommended = js.configs.recommended;
export const eslintWeb = {
  files: ['**/*.js', '**/*.mjs'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      ...globals.browser,
    },
  },
  plugins: {
    prettier,
  },
  rules: {
    'prettier/prettier': 'warn',
    ...js.configs.recommended.rules,
  },
};

export default [
  globalIgnores,
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'warn',
    },
  },
];
