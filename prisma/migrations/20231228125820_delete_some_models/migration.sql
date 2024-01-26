/*
  Warnings:

  - You are about to drop the column `levelEmployeeId` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `unityId` on the `entrances` table. All the data in the column will be lost.
  - You are about to drop the `employeeposition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `levelemployee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `positions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `signatures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "employeeposition" DROP CONSTRAINT "employeeposition_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "employeeposition" DROP CONSTRAINT "employeeposition_positionId_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_levelEmployeeId_fkey";

-- DropForeignKey
ALTER TABLE "entrances" DROP CONSTRAINT "entrances_unityId_fkey";

-- DropForeignKey
ALTER TABLE "signatures" DROP CONSTRAINT "signatures_employeeId_fkey";

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "levelEmployeeId";

-- AlterTable
ALTER TABLE "entrances" DROP COLUMN "unityId";

-- DropTable
DROP TABLE "employeeposition";

-- DropTable
DROP TABLE "levelemployee";

-- DropTable
DROP TABLE "positions";

-- DropTable
DROP TABLE "signatures";
