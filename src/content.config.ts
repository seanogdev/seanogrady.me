import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    coverImage: z.string().optional(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    title: z.string(),
  }),
});

export const collections = { posts };
