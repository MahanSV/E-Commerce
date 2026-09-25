import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import {merchantDTOSchema} from "#webhost/validators/mercahnt/merchant.ts";
import {productDTOSchema} from "#webhost/validators/products/products.ts";

extendZodWithOpenApi(z);

const merchantProductDTOSchema = z.object({
    id: z.string(),
    merchantId: z.string(),
    productId: z.string(),
    merchant: z.lazy((): z.ZodType => merchantDTOSchema).optional().nullable(),
    product: z.lazy((): z.ZodType => productDTOSchema).optional().nullable(),
}).openapi('merchantProductDTOSchema');

export { merchantProductDTOSchema };