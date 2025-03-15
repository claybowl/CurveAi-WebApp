import { PrismaClient } from '@prisma/client'

// For serverless environments like Vercel
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Set a specific connection URL for Vercel, with correct pooling settings
const connectionUrl = process.env.POSTGRES_PRISMA_URL || 
                      process.env.DATABASE_URL || 
                      undefined

// Create PrismaClient with the right options
const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['error'],
  datasourceUrl: connectionUrl,
})

// Save the instance in dev to avoid multiple clients
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Export the client for use throughout the app
export const Database = prisma
