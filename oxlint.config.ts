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
    'no-console': 'warn',
    'unicorn/filename-case': ['warn', { cases: { kebabCase: true, pascalCase: true } }],
  },
});
