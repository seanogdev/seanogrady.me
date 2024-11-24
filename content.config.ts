import { defineCollection } from '@nuxt/content';

export const collections = {
  blog: defineCollection({
    type: 'page',
    source: '**/*.md',
    cwd: 'app/content',
  }),
};
