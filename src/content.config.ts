import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Takımlarımız — her takım src/content/teams/ altında bir .md dosyasıdır.
 */
const teams = defineCollection({
  loader: glob({ base: './src/content/teams', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().default(''),
    category: z.string().default('Genel'),
    status: z.enum(['Aktif', 'Yeni Takım', 'Arşiv']).default('Aktif'),
    order: z.number().default(99),
    image: z.string().default(''),
    focus: z.array(z.string()).default([]),
    achievements: z.array(z.string()).default([]),
    summary: z.string().default(''),
  }),
});

/**
 * Faaliyetlerimiz — eğitimler, teknik geziler, etkinlikler, sosyal sorumluluk.
 */
const activities = defineCollection({
  loader: glob({ base: './src/content/activities', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    type: z.string().default('Etkinlik'),
    date: z.coerce.date(),
    endDate: z.string().default(''),
    order: z.number().default(99),
    image: z.string().default(''),
    stats: z
      .array(z.object({ label: z.string(), value: z.string() }))
      .default([]),
    summary: z.string().default(''),
  }),
});

export const collections = { teams, activities };
