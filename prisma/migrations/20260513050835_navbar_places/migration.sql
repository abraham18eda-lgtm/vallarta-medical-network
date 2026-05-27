-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "locale" TEXT DEFAULT 'es',
ADD COLUMN     "navbarLabel" TEXT,
ADD COLUMN     "navbarOrder" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "showInNavbar" BOOLEAN NOT NULL DEFAULT false;
