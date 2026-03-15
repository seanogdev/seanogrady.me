import tailwindcss from '@tailwindcss/vite';

const modules = ['app', 'home', 'posts'];
const moduleDirectories = modules.map((dir) => ({
  path: `~/components/${dir}`,
  pathPrefix: false,
}));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
  compatibilityDate: '2025-10-06',
  components: moduleDirectories,
  css: ['~/style.css'],
  devtools: { enabled: true },
  icon: { mode: 'svg' },
  modules: ['@nuxt/content', '@nuxt/fonts', '@nuxt/icon', '@nuxt/eslint', '@nuxtjs/color-mode'],
  fonts: {
    families: [
      {
        name: 'Plus Jakarta Sans',
        provider: 'google',
        weights: ['200 800'],
        styles: ['normal', 'italic'],
        global: true,
      },
      { name: 'Fraunces', provider: 'google', weights: ['100 900'], styles: ['normal', 'italic'], global: true },
    ],
    processCSSVariables: true,
  },
  colorMode: { classSuffix: '' },
  runtimeConfig: {
    lastfmApiKey: '',
    lastfmUsername: '',
  },
  eslint: {
    config: {
      stylistic: false,
      typescript: {
        tsconfigPath: './tsconfig.json',
      },
    },
  },
  nitro: {
    preset: 'cloudflarePagesStatic',
  },
  ssr: false,
  experimental: {
    viewTransition: true,
    payloadExtraction: false,
  },
  vite: {
    optimizeDeps: {
      include: ['es-toolkit', 'luxon'],
    },
    plugins: [tailwindcss()],
    server: { forwardConsole: true },
  },
});
