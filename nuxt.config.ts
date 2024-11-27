import tailwindcss from '@tailwindcss/vite';

const moduleDirectories = ['app', 'home', 'about', 'blog'].map((dir) => ({
  path: `~/components/${dir}`,
  pathPrefix: false,
}));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  components: moduleDirectories,
  css: ['~/app.css'],
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: ['@nuxt/content', 'reka-ui/nuxt'],
  vite: {
    plugins: [tailwindcss()],
  },
});
