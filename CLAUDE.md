# CLAUDE.md - Agent Guidelines for @cosn/tsc

## Commands

- `pnpm format`: Format code with Prettier
- `pnpm lint`: Run ESLint with auto-fix

## Code Style

- **TypeScript**: Strict typing with noUncheckedIndexedAccess, noUnusedLocals
- **Imports**: Sort alphabetically, group by [builtin → external → internal → parent → sibling/index]
- **Types**: Use inline imports (`import type { Type }`) and inline exports
- **Formatting**: No semicolons, single quotes (including JSX), trailing commas
- **Functions**: Use function expressions, avoid declarations
- **Variables**: Use const by default, descriptive names
- **Error Handling**: No FIXMEs allowed (error-level restriction)
- **React Components**: Form components and Link/NavLink have special settings

## Commit Style

- Follow conventional commits via commitlint

## File Structure

- This package provides shared configs for TypeScript, ESLint, and Prettier
- Available presets: tsconfig-srv, tsconfig-web, tsconfig-lib, tsconfig-node
