import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import { remarkReadingTime } from './src/utils/remark-reading-time.ts';

export default defineConfig({
  adapter: cloudflare(),
  integrations: [vue(), icon()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
