import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Prisma connected to MongoDB successfully');
  } catch (error) {
    console.error('Prisma connection error:', error.message);
    process.exit(1); 
  }
};


