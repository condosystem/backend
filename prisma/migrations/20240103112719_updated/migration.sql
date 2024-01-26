/*
  Warnings:

  - You are about to drop the column `unityId` on the `entrances` table. All the data in the column will be lost.
  - Added the required column `unitySectionId` to the `entrances` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "entrances" DROP CONSTRAINT "entrances_unityId_fkey";

-- AlterTable
ALTER TABLE "entrances" DROP COLUMN "unityId",
ADD COLUMN     "unitySectionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "entrances" ADD CONSTRAINT "entrances_unitySectionId_fkey" FOREIGN KEY ("unitySectionId") REFERENCES "unitysection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
