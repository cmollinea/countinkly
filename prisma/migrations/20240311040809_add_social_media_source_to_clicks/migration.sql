/*
  Warnings:

  - Added the required column `source` to the `Clicks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Clicks" ADD COLUMN     "source" TEXT NOT NULL,
ALTER COLUMN "origin" SET DEFAULT 'Unknown';
