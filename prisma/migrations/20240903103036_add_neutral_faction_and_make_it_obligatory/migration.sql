/*
  Warnings:

  - Made the column `faction` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "Faction" ADD VALUE 'NEUTRAL';

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "faction" SET NOT NULL;
