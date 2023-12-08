/*
  Warnings:

  - You are about to drop the column `password` on the `accounts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "password";

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_key" ON "accounts"("email");
