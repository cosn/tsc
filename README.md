# @cosn/tsc

Sensible defaults I use for my projects.

## Installation

```shell
pnpm add --save-dev @cosn/tsc
```

## Usage

### TypeScript

Create a `tsconfig.json` file in your project root with the following content:

#### Server

```json
{
  "extends": ["@cosn/tsc/tsconfig-srv"]
}
```

#### Web

```json
{
  "extends": ["@cosn/tsc/tsconfig-web"]
}
```

### Prettier

#### Default

Use this config is in your `package.json`:

```json
"prettier": "@cosn/tsc/prettier",
```

#### Customizing

Create a `.prettierrc.js` file in your project root with the following content:

```js
import defaultConfig from '@cosn/tsc/prettier'

/** @type {import("prettier").Options} */
export default {
  ...defaultConfig,
  // overrides
}
```

### ESLint

Create a `eslint.config.js` file in your project root with the following content:

```js
import { config as defaultConfig } from '@cosn/tsc/eslint'

/** @type {import("eslint").Linter.Config} */
export default [...defaultConfig]
```
