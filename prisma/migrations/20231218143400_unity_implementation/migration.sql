/*
  Warnings:

  - You are about to drop the `entrance` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `localityId` to the `persons` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "entrance" DROP CONSTRAINT "entrance_personId_fkey";

-- DropForeignKey
ALTER TABLE "entrance" DROP CONSTRAINT "entrance_unityId_fkey";

-- AlterTable
ALTER TABLE "persons" ADD COLUMN     "localityId" TEXT NOT NULL,
ALTER COLUMN "avatar" DROP NOT NULL;

-- DropTable
DROP TABLE "entrance";

-- CreateTable
CREATE TABLE "entrances" (
    "id" TEXT NOT NULL,
    "ksId" SERIAL NOT NULL,
    "personId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "unityId" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "entrances_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "persons" ADD CONSTRAINT "persons_localityId_fkey" FOREIGN KEY ("localityId") REFERENCES "localities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrances" ADD CONSTRAINT "entrances_personId_fkey" FOREIGN KEY ("personId") REFERENCES "persons"("idCardNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrances" ADD CONSTRAINT "entrances_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("personId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrances" ADD CONSTRAINT "entrances_unityId_fkey" FOREIGN KEY ("unityId") REFERENCES "unity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
