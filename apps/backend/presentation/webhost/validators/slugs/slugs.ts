import { z } from 'zod';

const getProductBySlugSchema = z.object({
    slug: z.string({ error: "slug is required." }).min(1, { error: "slug is required." }),
});

export {
    getProductBySlugSchema,
}
