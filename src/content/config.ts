import { defineCollection, z } from 'astro:content';

const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    source: z.string().optional(),
    excerpt: z.string(),
  }),
});

const laws = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    excerpt: z.string(),
  }),
});

const cases = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    source: z.string(),
    excerpt: z.string(),
  }),
});

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    source: z.string().optional(),
    excerpt: z.string(),
  }),
});

export const collections = { news, laws, cases, articles };