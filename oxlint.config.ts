import { defineConfig } from 'oxlint';

export default defineConfig({
  categories: {
    correctness: 'error',
    pedantic: 'warn',
    perf: 'warn',
    restriction: 'warn',
    style: 'warn',
    suspicious: 'warn',
  },
  env: {
    browser: true,
    es2022: true,
  },
  plugins: ['typescript', 'unicorn', 'vue'],
  rules: {
    'func-names': 'off',
    'func-style': ['warn', 'declaration', { allowArrowFunctions: true }],
    'no-console': 'warn',
    'no-implicit-globals': 'off',
    'no-magic-numbers': 'off',
    'no-ternary': 'off',
    'no-undefined': 'off',
    'sort-imports': 'off',
    'typescript/explicit-function-return-type': 'off',
    'typescript/explicit-module-boundary-types': 'off',
    'unicorn/filename-case': ['warn', { cases: { kebabCase: true, pascalCase: true } }],
    'unicorn/max-nested-calls': 'off',
    'unicorn/prefer-global-this': 'off',
  },
});
