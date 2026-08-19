import js from '@eslint/js';
import globals from 'globals';

import prettier from 'eslint-plugin-prettier';

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
  ignores: [
    '**/.*',
    'node_modules/*',
    '**/build/*',
    '--help/*',
    '.husky/*',
    '.vscode/*',
    'images/*',
    '**/*.amd.js',
    '**/*.umd.js',
  ],
};

export default [
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
    ignores: [
      '**/.*',
      'node_modules/*',
      '**/build/*',
      '--help/*',
      '.husky/*',
      '.vscode/*',
      'images/*',
    ],
  },
];
