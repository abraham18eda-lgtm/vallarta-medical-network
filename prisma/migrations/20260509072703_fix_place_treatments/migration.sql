/*
  Warnings:

  - You are about to drop the column `placeId` on the `Treatment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Treatment" DROP CONSTRAINT "Treatment_placeId_fkey";

-- AlterTable
ALTER TABLE "Treatment" DROP COLUMN "placeId";

-- CreateTable
CREATE TABLE "PlaceTreatment" (
    "placeId" TEXT NOT NULL,
    "treatmentId" TEXT NOT NULL,

    CONSTRAINT "PlaceTreatment_pkey" PRIMARY KEY ("placeId","treatmentId")
);

-- AddForeignKey
ALTER TABLE "PlaceTreatment" ADD CONSTRAINT "PlaceTreatment_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaceTreatment" ADD CONSTRAINT "PlaceTreatment_treatmentId_fkey" FOREIGN KEY ("treatmentId") REFERENCES "Treatment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
