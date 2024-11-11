/** @type {import("prettier").Options} */
export const config = {
  arrowParens: 'always',
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  tailwindFunctions: ['clsx', 'cn', 'twMerge'],
}

export default config
