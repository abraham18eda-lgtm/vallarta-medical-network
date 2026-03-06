import { PrismaClient } from '@prisma/client';

// Crear una única instancia del cliente Prisma
const prisma = new PrismaClient();

// Exportar la instancia para que puedas usarla en cualquier parte del proyecto
export const db = prisma;