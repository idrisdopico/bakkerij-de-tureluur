module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: true,
  bracketSameLine: true,
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrder: ['^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  overrides: [
    {
      files: ['*.md'],
      options: {
        tabWidth: 4,
      },
    },
  ],
};
