import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const chapters = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/chapters" }),
  schema: z.object({
    number: z.number(),
    title: z.string(),
    shortTitle: z.string(),
    description: z.string(),
    readingTime: z.number(), // minutes
  }),
});

export const collections = { chapters };
