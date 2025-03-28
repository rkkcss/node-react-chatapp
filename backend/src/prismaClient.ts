import { PrismaClient } from '@prisma/client';

// Prisma kliens inicializálása
export const prisma = new PrismaClient();

// Felhasználó modell elérése
export const User = prisma.user;
