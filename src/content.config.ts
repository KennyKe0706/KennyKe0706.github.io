import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/*.md",
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().int().positive(),
    featured: z.boolean().default(false),
    kind: z.enum(["prototype", "tool"]),
    technologies: z.array(z.string()),
    concepts: z.array(z.string()),
    repository: z.url(),
    cover: z.string(),
    coverAlt: z.string(),
    year: z.number().int(),
  }),
});

export const collections = { projects };
