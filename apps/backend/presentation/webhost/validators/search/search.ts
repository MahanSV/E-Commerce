import { z } from 'zod';


const searchProductsSchema = z.object({
    query: z.unknown().refine((value) => value !== undefined && value !== null, { message: 'query is a required field' }),
});

export {
    searchProductsSchema,
}
