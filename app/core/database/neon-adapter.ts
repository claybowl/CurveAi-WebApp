import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';

// Create a connection pool
export function createPrismaClientWithNeon() {
  const connectionString = process.env.DATABASE_URL_UNPOOLED;
  
  if (!connectionString) {
    throw new Error('DATABASE_URL_UNPOOLED environment variable is not set');
  }

  // Create a new connection pool
  const pool = new Pool({ connectionString });

  // Create a new adapter instance
  const adapter = new PrismaNeon(pool);

  // Create a new PrismaClient instance
  const prisma = new PrismaClient({
    adapter,
    log: ['error'],
  });

  return { prisma, pool };
}