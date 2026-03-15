import tailwindcss from '@tailwindcss/vite';

const modules = ['app', 'home', 'posts', 'shared'];
const moduleDirectories = modules.map((dir) => ({
  path: `~/components/${dir}`,
  pathPrefix: false,
}));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      ],
    },
  },
  compatibilityDate: '2025-10-06',
  components: moduleDirectories,
  css: ['~/style.css'],
  devtools: { enabled: true },
  icon: { mode: 'svg' },
  modules: ['@nuxt/content', '@nuxt/icon', '@nuxt/eslint', '@nuxtjs/color-mode'],
  colorMode: {
    classSuffix: '',
  },
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
  experimental: {
    viewTransition: true,
  },
  vite: {
    optimizeDeps: {
      include: ['es-toolkit', 'luxon'],
    },
    plugins: [tailwindcss()],
    server: { forwardConsole: true },
  },
});
