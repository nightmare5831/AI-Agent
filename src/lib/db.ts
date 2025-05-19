import { PrismaClient } from '@/prisma/client';
export { type Prisma } from '@/prisma/client';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['info', 'warn', 'error'],
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
