import { PrismaClient } from '@prisma/client';
import env from '#substructure/env.ts';

const prismaClient = new PrismaClient({
    errorFormat: env.environment === 'production' ? 'minimal' : 'pretty',
});

const prisma = prismaClient;

export type Prisma = typeof prisma;

export default prisma;