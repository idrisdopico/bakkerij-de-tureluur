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
    {
      // UI components must not reach the CMS directly — enforce the data seam.
      files: ['src/components/**/*.ts', 'src/components/**/*.tsx'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'payload',
                message:
                  'Read data through src/backend/lib/content.ts, not the Payload API, from UI code.',
              },
              {
                name: '@payload-config',
                message: 'Do not import the Payload config into UI code.',
              },
            ],
          },
        ],
      },
    },
  ],
  rules: {
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    // Import order is owned by @trivago/prettier-plugin-sort-imports.
    'import/order': 'off',
    // The Payload instance is reached only through the lib data layer
    // (content.ts / email.ts); UI must not import the client directly.
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {
            target: './src/components',
            from: './src/backend/lib/payload-client.ts',
            message:
              'Read data through src/backend/lib/content.ts, not the Payload client directly.',
          },
          {
            target: './src/app/(frontend)',
            from: './src/backend/lib/payload-client.ts',
            message:
              'Read data through src/backend/lib/content.ts, not the Payload client directly.',
          },
        ],
      },
    ],
  },
};
