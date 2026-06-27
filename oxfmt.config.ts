import { defineConfig } from 'oxfmt';

export default defineConfig({
  experimentalSortImports: {
    groups: [
      ['side_effect'],
      ['builtin'],
      ['external', 'type-external'],
      ['internal', 'type-internal'],
      ['parent', 'type-parent'],
      ['sibling', 'type-sibling'],
      ['index', 'type-index'],
    ],
  },
  experimentalTailwindcss: {
    attributes: ['class', 'className'],
    functions: ['clsx', 'cn', 'tv'],
    preserveDuplicates: false,
    preserveWhitespace: false,
    stylesheet: './src/styles/global.css',
  },
  htmlWhitespaceSensitivity: 'ignore',
  ignorePatterns: ['.claude/'],
  jsxSingleQuote: true,
  printWidth: 120,
  singleQuote: true,
  sortPackageJson: true,
});
