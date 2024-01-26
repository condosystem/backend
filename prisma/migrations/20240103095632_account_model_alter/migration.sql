/*
  Warnings:

  - You are about to drop the column `accountId` on the `employees` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employeeId]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employeeId` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_accountId_fkey";

-- DropIndex
DROP INDEX "employees_accountId_key";

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "employeeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "accountId";

-- CreateIndex
CREATE UNIQUE INDEX "accounts_employeeId_key" ON "accounts"("employeeId");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("personId") ON DELETE RESTRICT ON UPDATE CASCADE;
