CREATE TABLE "DoctorTranslation" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "city" TEXT,
    "state" TEXT,

    CONSTRAINT "DoctorTranslation_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "DoctorTranslation_doctorId_locale_key"
ON "DoctorTranslation"("doctorId", "locale");

ALTER TABLE "DoctorTranslation"
ADD CONSTRAINT "DoctorTranslation_doctorId_fkey"
FOREIGN KEY ("doctorId")
REFERENCES "Doctor"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;