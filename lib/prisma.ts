import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prismaNew: PrismaClient };

export const prisma =
    globalForPrisma.prismaNew || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prismaNew = prisma;
