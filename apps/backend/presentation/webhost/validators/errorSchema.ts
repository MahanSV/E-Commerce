import {z} from "zod";

const errorSchema = z.object({
    statusCode: z.number(),
    message: z.string(),
    code: z.string()
});

export { errorSchema };