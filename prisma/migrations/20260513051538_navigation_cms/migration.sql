/*
  Warnings:

  - You are about to drop the column `navbarLabel` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `navbarOrder` on the `Place` table. All the data in the column will be lost.
  - You are about to drop the column `showInNavbar` on the `Place` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Place" DROP COLUMN "navbarLabel",
DROP COLUMN "navbarOrder",
DROP COLUMN "showInNavbar";

-- CreateTable
CREATE TABLE "NavigationItem" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'es',
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "placeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NavigationItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NavigationItem" ADD CONSTRAINT "NavigationItem_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;
