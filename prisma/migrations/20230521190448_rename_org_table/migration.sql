/*
  Warnings:

  - You are about to drop the `_ORGToPet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ORGToPet" DROP CONSTRAINT "_ORGToPet_A_fkey";

-- DropForeignKey
ALTER TABLE "_ORGToPet" DROP CONSTRAINT "_ORGToPet_B_fkey";

-- DropTable
DROP TABLE "_ORGToPet";

-- CreateTable
CREATE TABLE "_OrgToPet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrgToPet_AB_unique" ON "_OrgToPet"("A", "B");

-- CreateIndex
CREATE INDEX "_OrgToPet_B_index" ON "_OrgToPet"("B");

-- AddForeignKey
ALTER TABLE "_OrgToPet" ADD CONSTRAINT "_OrgToPet_A_fkey" FOREIGN KEY ("A") REFERENCES "orgs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrgToPet" ADD CONSTRAINT "_OrgToPet_B_fkey" FOREIGN KEY ("B") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
