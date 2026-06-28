import eslintPluginJs from '@eslint/js';
import * as eslintParserAstro from 'astro-eslint-parser';
import type { Linter } from 'eslint';
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss';
import eslintPluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';
import * as eslintPluginTypescript from 'typescript-eslint';
import eslintParserVue from 'vue-eslint-parser';

const eslintPluginBetterTailwindCssOverrideConfig: Linter.Config = {
  rules: {
    'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
    'better-tailwindcss/no-unknown-classes': [
      'error',
      {
        ignore: ['bar', 'bar-1', 'bar-2', 'bar-3', 'equalizer', 'not-prose', 'prose', 'squircle'],
      },
    ] as Linter.RuleEntry<[{ ignore: string[] }]>,
  },
  settings: {
    'better-tailwindcss': {
      entryPoint: 'src/styles/global.css',
    },
  },
};

export default defineConfig(
  { ignores: ['node_modules', 'dist', 'public', '.astro/**', '.output/**'] },
  {
    extends: [eslintPluginJs.configs.recommended, eslintPluginTypescript.configs.recommended],
    files: ['**/*.{js,ts}'],
  },
  {
    extends: [
      eslintPluginVue.configs['flat/recommended'],
      eslintPluginBetterTailwindcss.configs.recommended,
      eslintPluginBetterTailwindCssOverrideConfig,
    ],
    files: ['**/*.vue'],
    languageOptions: {
      parser: eslintParserVue,
      parserOptions: {
        parser: eslintPluginTypescript.parser,
      },
    },
    rules: {
      'vue/html-self-closing': 'off',
      'vue/max-attributes-per-line': 'off',
    },
  },
  {
    extends: [eslintPluginBetterTailwindcss.configs.recommended, eslintPluginBetterTailwindCssOverrideConfig],
    files: ['**/*.astro'],
    languageOptions: {
      parser: eslintParserAstro,
      parserOptions: {
        extraFileExtensions: ['.astro'],
        parser: eslintPluginTypescript.parser,
      },
    },
  },
);
