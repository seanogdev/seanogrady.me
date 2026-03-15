import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: [
    // Nuxt auto-imports all components — Knip's Nuxt plugin doesn't detect this
    'app/components/**/*.vue',
  ],
  ignoreDependencies: [
    // Peer deps of @nuxt/eslint, loaded via generated .nuxt/eslint.config.mjs
    '@eslint/js',
    '@nuxt/eslint-config',
    'eslint-plugin-vue',
    'globals',
    'typescript-eslint',
    // Nuxt auto-imports vue-router
    'vue-router',
    // Pinned to stay on latest version
    'vue',
    // Sub-deps of @nuxtjs/mdc installed directly to fix optimizeDeps resolution
    'debug',
    'parse5',
    'rehype-raw',
    'remark-emoji',
    'remark-gfm',
    'remark-mdc',
    'remark-rehype',
    'unist-util-visit',
  ],
  ignore: [
    // Config files consumed by their respective tools, not imported by code
    'oxlint.config.ts',
    'content.config.ts',
  ],
};

export default config;
