/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Athlete` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Athlete` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Athlete" DROP CONSTRAINT "Athlete_userId_fkey";

-- AlterTable
ALTER TABLE "Athlete" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Athlete_email_key" ON "Athlete"("email");

-- AddForeignKey
ALTER TABLE "Athlete" ADD CONSTRAINT "Athlete_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
