/*
  Warnings:

  - You are about to drop the column `city` on the `orgs` table. All the data in the column will be lost.
  - Added the required column `city_id` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pet_id` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "city",
ADD COLUMN     "city_id" TEXT NOT NULL,
ADD COLUMN     "pet_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "cities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orgs" ADD CONSTRAINT "orgs_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orgs" ADD CONSTRAINT "orgs_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
