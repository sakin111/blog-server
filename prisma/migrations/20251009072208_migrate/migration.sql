/*
  Warnings:

  - You are about to drop the column `published` on the `Post` table. All the data in the column will be lost.
  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "published",
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "thumbnail" TEXT,
ADD COLUMN     "views" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "title" SET DATA TYPE TEXT,
ALTER COLUMN "content" SET NOT NULL;
