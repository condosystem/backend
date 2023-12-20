/*
  Warnings:

  - Added the required column `accountTypeId` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "accountTypeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "accounttype" (
    "id" TEXT NOT NULL,
    "ksId" SERIAL NOT NULL,
    "designation" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounttype_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_accountTypeId_fkey" FOREIGN KEY ("accountTypeId") REFERENCES "accounttype"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
