import cloudflare from '@astrojs/cloudflare';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

import { remarkReadingTime } from './src/utils/remark-reading-time.ts';

export default defineConfig({
  adapter: cloudflare({ prerenderEnvironment: 'node' }),
  integrations: [vue(), icon()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  vite: {
    optimizeDeps: {
      include: ['debug'],
    },
    plugins: [tailwindcss()],
    resolve: {
      tsconfigPaths: true,
    },
  },
});
