-- AlterTable
ALTER TABLE "Clicks" ALTER COLUMN "timestamp" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "displayName" TEXT NOT NULL DEFAULT 'Display Name Fallback';
