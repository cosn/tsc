// Originally forked from https://github.com/epicweb-dev/config/blob/main/eslint.js

import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import globals from 'globals'
import ts from 'typescript-eslint'

const ERROR = 'error'
const WARN = 'warn'

const vitestFiles = ['**/__tests__/**/*', '**/*.test.*']
const testFiles = ['**/tests/**', '**/#tests/**', ...vitestFiles]
const playwrightFiles = ['**/e2e/**']

export const config = [
  {
    ignores: [
      '**/.next/**',
      '**/node_modules/**',
      '**/out/**',
      '**/public/**',
      '**/coverage/**',
      '**/dist/**',
    ],
  },
  {
    plugins: {
      import: (await import('eslint-plugin-import-x')).default,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-var': ERROR,
      'no-unexpected-multiline': ERROR,
      'no-warning-comments': [
        ERROR,
        { terms: ['FIXME'], location: 'anywhere' },
      ],
      'prefer-const': ERROR,
      'import/no-duplicates': [WARN, { 'prefer-inline': true }],
      'import/order': [
        WARN,
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroups: [{ pattern: '#*/**', group: 'internal' }],
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts?(x)', '**/*.js?(x)'],
    plugins: {
      react: (await import('eslint-plugin-react')).default,
      'react-hooks': (await import('eslint-plugin-react-hooks')).default,
    },
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        jsx: true,
      },
    },
  },
  {
    files: ['**/*.js?(x)'],
    rules: {
      'no-unused-vars': [
        WARN,
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^ignored',
        },
      ],
    },
  },
  {
    files: ['**/*.ts?(x)'],
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      ts: ts.plugin,
    },
    rules: {
      'ts/no-unused-vars': [
        WARN,
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^ignored',
        },
      ],
      'import/consistent-type-specifier-style': [WARN, 'prefer-inline'],
      'ts/consistent-type-imports': [
        WARN,
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: true,
          fixStyle: 'inline-type-imports',
        },
      ],
    },
  },
  {
    files: ['**/*.ts?(x)', '**/*.js?(x)'],
    ignores: testFiles,
    rules: {
      'no-restricted-imports': [
        ERROR,
        {
          patterns: [
            {
              group: testFiles,
              message: 'Do not import test files in source files',
            },
          ],
        },
      ],
    },
  },
  {
    files: testFiles,
    ignores: [...playwrightFiles],
    plugins: {
      testing: (await import('eslint-plugin-testing-library')).default,
      vitest: (await import('eslint-plugin-vitest')).default,
    },
    rules: {
      'testing/no-unnecessary-act': [ERROR, { isStrict: false }],
      'testing/no-wait-for-side-effects': ERROR,
      'testing/prefer-find-by': ERROR,
    },
  },
  prettier,
]

export default config
