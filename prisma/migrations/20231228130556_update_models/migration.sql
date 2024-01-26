/*
  Warnings:

  - Added the required column `unityId` to the `entrances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "entrances" ADD COLUMN     "unityId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "entrances" ADD CONSTRAINT "entrances_unityId_fkey" FOREIGN KEY ("unityId") REFERENCES "unity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
