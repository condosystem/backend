/*
  Warnings:

  - Added the required column `unityId` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "unityId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_unityId_fkey" FOREIGN KEY ("unityId") REFERENCES "unity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
