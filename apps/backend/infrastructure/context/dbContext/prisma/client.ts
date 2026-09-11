import { PrismaClient } from '@prisma/client';
import { pagination } from "prisma-extension-pagination";
import env from '#substructure/env.ts';
// Note: I have fixed using prisma
export const prismaClient = new PrismaClient({
    errorFormat: env.environment === 'production' ? 'minimal' : 'pretty',
});

const prisma = prismaClient.$extends(pagination());

export type Prisma = typeof prisma;

export default prisma;