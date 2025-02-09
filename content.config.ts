import { defineCollection } from '@nuxt/content';

export const collections = {
  posts: defineCollection({
    type: 'page',
    source: 'posts/**/*.md',
  }),
};
