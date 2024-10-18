/*
  Warnings:

  - You are about to alter the column `score` on the `Round` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Round" ALTER COLUMN "score" SET DATA TYPE INTEGER;
