import { defineCollection } from '@nuxt/content';
import { z } from 'zod';

export const collections = {
  posts: defineCollection({
    type: 'page',
    source: 'posts/**/*.md',
    schema: z.object({
      date: z.string(),
      tags: z.array(z.string()),
      rawbody: z.string(),
      coverImage: z.string().optional(),
      readingTime: z.number(),
      slug: z.string(),
    }),
  }),
};
