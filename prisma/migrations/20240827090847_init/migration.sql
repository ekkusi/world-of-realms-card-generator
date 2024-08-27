-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('ENTITY', 'SPELL');

-- CreateEnum
CREATE TYPE "Faction" AS ENUM ('NATURE', 'TIME');

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cardType" "CardType" NOT NULL,
    "cost" INTEGER NOT NULL,
    "faction" "Faction",
    "damage" INTEGER,
    "health" INTEGER,
    "influence" INTEGER,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);
