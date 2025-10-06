import withNuxt from './.nuxt/eslint.config.mjs';

/** @type {import('eslint').Linter.Config[]} */
export default withNuxt([
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
]);
