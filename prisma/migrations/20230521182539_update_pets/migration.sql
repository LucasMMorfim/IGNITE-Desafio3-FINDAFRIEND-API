/*
  Warnings:

  - You are about to drop the column `pet_id` on the `orgs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "orgs" DROP CONSTRAINT "orgs_pet_id_fkey";

-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "pet_id";

-- CreateTable
CREATE TABLE "_ORGToPet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ORGToPet_AB_unique" ON "_ORGToPet"("A", "B");

-- CreateIndex
CREATE INDEX "_ORGToPet_B_index" ON "_ORGToPet"("B");

-- AddForeignKey
ALTER TABLE "_ORGToPet" ADD CONSTRAINT "_ORGToPet_A_fkey" FOREIGN KEY ("A") REFERENCES "orgs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ORGToPet" ADD CONSTRAINT "_ORGToPet_B_fkey" FOREIGN KEY ("B") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
