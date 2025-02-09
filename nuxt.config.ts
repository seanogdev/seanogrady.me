import tailwindcss from '@tailwindcss/vite';

const modules = ['app', 'home', 'about', 'posts'];
const moduleDirectories = modules.map((dir) => ({
  path: `~/components/${dir}`,
  pathPrefix: false,
}));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  components: moduleDirectories,
  css: ['~/style.css'],
  devtools: { enabled: true },
  icon: { mode: 'svg' },
  future: { compatibilityVersion: 4 },
  modules: ['@nuxt/content', 'reka-ui/nuxt', '@nuxt/icon'],
  vite: { plugins: [tailwindcss()] },
});
