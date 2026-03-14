import { defineConfig } from 'oxlint';

export default defineConfig({
  categories: {},
  rules: {
    'eslint/func-style': ['error', 'declaration'],
  },
  settings: {
    jsdoc: {
      ignorePrivate: false,
      ignoreInternal: false,
      ignoreReplacesDocs: true,
      overrideReplacesDocs: true,
      augmentsExtendsReplacesDocs: false,
      implementsReplacesDocs: false,
      exemptDestructuredRootsFromChecks: false,
      tagNamePreference: {},
    },
  },
  env: {
    builtin: true,
  },
  globals: {},
  ignorePatterns: [],
});
