/*
  Warnings:

  - You are about to drop the column `departmentId` on the `employeeposition` table. All the data in the column will be lost.
  - You are about to drop the `departments` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[accountId]` on the table `employees` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `localityId` to the `unity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "employeeposition" DROP CONSTRAINT "employeeposition_departmentId_fkey";

-- AlterTable
ALTER TABLE "employeeposition" DROP COLUMN "departmentId";

-- AlterTable
ALTER TABLE "unity" ADD COLUMN     "localityId" TEXT NOT NULL;

-- DropTable
DROP TABLE "departments";

-- CreateTable
CREATE TABLE "localities" (
    "id" TEXT NOT NULL,
    "ksId" SERIAL NOT NULL,
    "designation" TEXT,
    "district" BOOLEAN NOT NULL DEFAULT false,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "localityId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "localities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_accountId_key" ON "employees"("accountId");

-- AddForeignKey
ALTER TABLE "localities" ADD CONSTRAINT "localities_localityId_fkey" FOREIGN KEY ("localityId") REFERENCES "localities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unity" ADD CONSTRAINT "unity_localityId_fkey" FOREIGN KEY ("localityId") REFERENCES "localities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
