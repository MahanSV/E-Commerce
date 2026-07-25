/**
 * This Version works Successfully.
 */

/*
import { PrismaClient } from '@prisma/client';
import env from '#substructure/env.ts';

const prismaClient = new PrismaClient({
    errorFormat: env.environment === 'production' ? 'minimal' : 'pretty',
});

const prisma = prismaClient;

export type Prisma = typeof prisma;

export default prisma;*/

/**
 * Let's try this version with pagination.
 */
import { PrismaClient } from '@prisma/client';
import { pagination } from "prisma-extension-pagination";
import env from '#substructure/env.ts';

const prismaClient = new PrismaClient({
    errorFormat: env.environment === 'production' ? 'minimal' : 'pretty',
});

const prisma = prismaClient.$extends(pagination());

export type Prisma = typeof prisma;

export default prisma;