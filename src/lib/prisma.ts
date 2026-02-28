import { PrismaClient } from '@prisma/client';

const isConfigured = Boolean(process.env.DATABASE_URL);

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient | null = (() => {
  if (!isConfigured) return null;
  if (global.prisma) return global.prisma;
  const client = new PrismaClient();
  if (process.env.NODE_ENV !== 'production') global.prisma = client;
  return client;
})();
