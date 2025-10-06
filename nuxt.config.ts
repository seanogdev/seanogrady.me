import tailwindcss from '@tailwindcss/vite';

const modules = ['app', 'home', 'about', 'posts', 'shared'];
const moduleDirectories = modules.map((dir) => ({
  path: `~/components/${dir}`,
  pathPrefix: false,
}));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-10-06',
  components: moduleDirectories,
  css: ['~/style.css'],
  devtools: { enabled: true },
  icon: { mode: 'svg' },
  modules: ['@nuxt/content', 'reka-ui/nuxt', '@nuxt/icon', '@nuxt/eslint'],
  vite: { plugins: [tailwindcss()] },
});
