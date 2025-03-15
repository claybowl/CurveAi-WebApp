import { PrismaClient } from '@prisma/client'

// Prevent multiple Prisma Client instances
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create a simple standard client first
const prismaClientSingleton = () => {
  // For Neon on Vercel, we specifically use the pooled connection which works better for serverless
  return new PrismaClient({
    log: ['error'],
    datasourceUrl: process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL
  })
}

// Use existing client or create new one
const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

// Don't recreate the client in development
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Export the client
export const Database = prisma
