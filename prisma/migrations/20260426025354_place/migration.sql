/*
  Warnings:

  - You are about to drop the `Clinic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClinicImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hospital` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HospitalImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PlaceType" AS ENUM ('HOSPITAL', 'CLINIC', 'LAB', 'DENTAL');

-- DropForeignKey
ALTER TABLE "ClinicImage" DROP CONSTRAINT "ClinicImage_clinicId_fkey";

-- DropForeignKey
ALTER TABLE "HospitalImage" DROP CONSTRAINT "HospitalImage_hospitalId_fkey";

-- DropTable
DROP TABLE "Clinic";

-- DropTable
DROP TABLE "ClinicImage";

-- DropTable
DROP TABLE "Hospital";

-- DropTable
DROP TABLE "HospitalImage";

-- CreateTable
CREATE TABLE "DoctorPlace" (
    "doctorId" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,

    CONSTRAINT "DoctorPlace_pkey" PRIMARY KEY ("doctorId","placeId")
);

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "PlaceType" NOT NULL,
    "description" TEXT,
    "city" TEXT,
    "state" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaceImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,

    CONSTRAINT "PlaceImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Place_slug_key" ON "Place"("slug");

-- AddForeignKey
ALTER TABLE "DoctorPlace" ADD CONSTRAINT "DoctorPlace_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DoctorPlace" ADD CONSTRAINT "DoctorPlace_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaceImage" ADD CONSTRAINT "PlaceImage_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
