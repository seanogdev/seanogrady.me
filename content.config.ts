import { defineCollection, z } from '@nuxt/content';

export const collections = {
  posts: defineCollection({
    type: 'page',
    source: 'posts/**/*.md',
    schema: z.object({
      date: z.coerce.date(),
      tags: z.array(z.string()),
      rawbody: z.string()
    })
  }),
};
