import { defineCollection, z } from 'astro:content';

const reviewsCollection = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    name: z.string(),
    bio: z.string().optional(),
    review: z.string(),
    socialLink: z.string().url().optional(),
    image: image().optional(),
    // Allow participants to specify a background color for their card
    color: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  }),
});

export const collections = {
  reviews: reviewsCollection,
};
