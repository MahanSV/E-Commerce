import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import {userDTOSchema} from "#webhost/validators/user/user.ts";
import {productDTOSchema} from "#webhost/validators/products/products.ts";

extendZodWithOpenApi(z);

const wishlistDTOSchema = z.object({
    id: z.string(),
    productId: z.string(),
    userId: z.string(),
    user: z.lazy((): z.ZodType => userDTOSchema).optional().nullable(),
    product: z.lazy((): z.ZodType => productDTOSchema).optional().nullable(),
});

export { wishlistDTOSchema };