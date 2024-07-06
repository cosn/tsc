// Originally forked from https://github.com/epicweb-dev/config/blob/main/eslint.js
import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import globals from 'globals'
import ts from 'typescript-eslint'

const OFF = 'off'
const WARN = 'warn'
const ERROR = 'error'

const vitestFiles = ['**/__tests__/**/*', '**/*.test.*']
const testFiles = ['**/tests/**', '**/#tests/**', ...vitestFiles]
const playwrightFiles = ['**/e2e/**']

export const config = ts.config(
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
      'no-unused-vars': [
        ERROR,
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^ignored',
        },
      ],
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
    rules: {
      'no-undef': OFF, // get rid of the 'React' is not defined error
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
      ...ts.configs.recommended.rules,
      ...ts.configs.stylistic.rules,
      'ts/no-unused-vars': [
        ERROR,
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^ignored',
        },
      ],
      'import/consistent-type-specifier-style': [ERROR, 'prefer-inline'],
      'ts/consistent-type-imports': [
        ERROR,
        {
          fixStyle: 'inline-type-imports',
        },
      ],
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      'func-style': ERROR,
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
)

export default config
