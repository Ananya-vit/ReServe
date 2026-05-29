/*
  Warnings:

  - You are about to drop the column `availablePickupTimes` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `Donation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "availablePickupTimes",
DROP COLUMN "expiresAt";
