import oxlint from 'eslint-plugin-oxlint';

import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  { ignores: ['eslint.config.ts', 'content.config.ts', 'oxlint.config.ts', 'knip.config.ts'] },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/attribute-hyphenation': ['error', 'never'],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'any',
          },
        },
      ],
      'vue/block-order': [
        'error',
        {
          order: ['script:not([setup])', 'script[setup]', 'template', 'style'],
        },
      ],
      'vue/define-macros-order': ['error'],
      'vue/define-props-declaration': ['error'],
      'vue/define-props-destructuring': [
        'error',
        {
          destructure: 'always',
        },
      ],
      'vue/no-unused-emit-declarations': ['error'],
      'vue/no-unused-properties': ['error'],
      'vue/no-unused-refs': ['error'],
      'vue/prop-name-casing': ['error', 'camelCase'],
      'vue/custom-event-name-casing': ['error', 'kebab-case'],
    },
  },
  {
    files: ['**/*.{ts,tsx,vue}'],
    rules: {
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true, allowBoolean: true }],
      '@typescript-eslint/restrict-plus-operands': ['error', { allowNumberAndString: true }],
    },
  },
  {
    files: ['**/*'],
    rules: {
      'func-style': ['error', 'declaration'],
    },
  },
  ...oxlint.configs['flat/recommended'],
);
