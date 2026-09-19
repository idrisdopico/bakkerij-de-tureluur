const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * ESLint configuration for a Next.js + React + TypeScript app.
 * Modelled on entertainment-web's `eslint-config-entertainment/next.js`.
 */

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project,
    tsconfigRootDir: __dirname,
  },
  plugins: ['jsx-a11y', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/strict',
    'plugin:@typescript-eslint/strict',
    'plugin:@typescript-eslint/stylistic',
    'plugin:@next/next/recommended',
    'prettier',
  ],
  env: {
    node: true,
    browser: true,
  },
  globals: {
    React: true,
    JSX: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['.*.js', 'node_modules/', '.next/'],
  overrides: [
    { files: ['*.js?(x)', '*.ts?(x)'] },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // Usage of CSS Modules requires these to be relaxed.
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        'react/button-has-type': 'off',
      },
    },
  ],
  rules: {
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    // Import order is owned by @trivago/prettier-plugin-sort-imports.
    'import/order': 'off',
  },
};
