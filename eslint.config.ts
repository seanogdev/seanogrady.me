import tsParser from '@typescript-eslint/parser';
import * as eslintParserAstro from 'astro-eslint-parser';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';
import eslintPluginVue from 'eslint-plugin-vue';
import eslintParserVue from 'vue-eslint-parser';

const tailwindSettings = {
  'better-tailwindcss': {
    entryPoint: 'src/styles/global.css',
  },
};

const betterTailwindRules = {
  ...eslintPluginBetterTailwindcss.configs.recommended.rules,
  'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
  'better-tailwindcss/no-unknown-classes': [
    'error',
    {
      ignore: ['bar', 'bar-1', 'bar-2', 'bar-3', 'equalizer', 'not-prose', 'prose', 'squircle'],
    },
  ],
};

export default [
  ...eslintPluginVue.configs['flat/recommended'],
  {
    ...eslintPluginBetterTailwindcss.configs.recommended,
    files: ['**/*.vue'],
    languageOptions: {
      parser: eslintParserVue,
      parserOptions: {
        parser: tsParser,
      },
    },
    rules: betterTailwindRules,
    settings: tailwindSettings,
  },
  {
    ...eslintPluginBetterTailwindcss.configs.recommended,
    files: ['**/*.astro'],
    languageOptions: {
      parser: eslintParserAstro,
      parserOptions: {
        extraFileExtensions: ['.astro'],
        parser: tsParser,
      },
    },
    rules: betterTailwindRules,
    settings: tailwindSettings,
  },
];
