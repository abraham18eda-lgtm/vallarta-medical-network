/*
  Warnings:

  - The primary key for the `Block` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `endDate` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Block` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Block` table. All the data in the column will be lost.
  - The `id` column on the `Block` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Block" DROP CONSTRAINT "Block_pkey",
DROP COLUMN "endDate",
DROP COLUMN "isActive",
DROP COLUMN "startDate",
ADD COLUMN     "endAt" TIMESTAMP(3),
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "startAt" TIMESTAMP(3),
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Block_pkey" PRIMARY KEY ("id");
