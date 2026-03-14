import oxlint from 'eslint-plugin-oxlint';

import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  {
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
    },
  },
  ...oxlint.configs['flat/recommended'],
);
