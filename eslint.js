// Fork from https://github.com/epicweb-dev/config/blob/main/eslint.js
import globals from 'globals'

const ERROR = 'error'
const WARN = 'warn'

const vitestFiles = ['**/__tests__/**/*', '**/*.test.*']
const testFiles = ['**/tests/**', '**/#tests/**', ...vitestFiles]
const playwrightFiles = ['**/e2e/**']

export default [
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
      'no-unexpected-multiline': ERROR,
      'no-warning-comments': [
        ERROR,
        { terms: ['FIXME'], location: 'anywhere' },
      ],
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
    files: ['**/*.tsx', '**/*.jsx'],
    plugins: {
      react: (await import('eslint-plugin-react')).default,
      'react-hooks': (await import('eslint-plugin-react-hooks')).default,
    },
    languageOptions: {
      parser: (await import('typescript-eslint')).parser,
      parserOptions: {
        jsx: true,
      },
    },
  },
  {
    files: ['**/*.ts?(x)', '**/*.js?(x)'],
    plugins: {
      'react-hooks': (await import('eslint-plugin-react-hooks')).default,
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
      parser: (await import('typescript-eslint')).parser,
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      ts: (await import('typescript-eslint')).plugin,
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
      'testing-library': (await import('eslint-plugin-testing-library'))
        .default,
      vitest: (await import('eslint-plugin-vitest')).default,
    },
    rules: {
      'testing-library/no-unnecessary-act': [ERROR, { isStrict: false }],
      'testing-library/no-wait-for-side-effects': ERROR,
      'testing-library/prefer-find-by': ERROR,
    },
  },
]
