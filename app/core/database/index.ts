import { PrismaClient } from '@prisma/client'

// For serverless environments like Vercel
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Initialize prisma with standard client
let prisma = globalForPrisma.prisma ?? new PrismaClient({ log: ['error'] });

// In development, save the instance to avoid multiple instances
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// In production on Vercel, try to use the Neon adapter for better performance
if (process.env.NODE_ENV === 'production' && process.env.VERCEL === '1') {
  try {
    const { Pool } = require('@neondatabase/serverless');
    const { PrismaNeon } = require('@prisma/adapter-neon');
    
    const connectionString = process.env.DATABASE_URL_UNPOOLED;
    
    if (connectionString) {
      // Create a new connection pool
      const pool = new Pool({ connectionString });
      
      // Create a new adapter instance
      const adapter = new PrismaNeon(pool);
      
      // Create a new PrismaClient instance with the adapter
      prisma = new PrismaClient({
        adapter,
        log: ['error'],
      });
      
      console.log('Using Neon serverless adapter for Prisma');
    }
  } catch (e) {
    console.error('Failed to initialize Neon adapter, using standard Prisma client', e);
  }
}

export const Database = prisma
