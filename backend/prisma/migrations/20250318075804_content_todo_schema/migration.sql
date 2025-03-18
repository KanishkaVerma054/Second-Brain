/*
  Warnings:

  - You are about to drop the `ContentTags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ContentTags` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Share` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hash]` on the table `Share` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ContentTags" DROP CONSTRAINT "ContentTags_contentId_fkey";

-- DropForeignKey
ALTER TABLE "ContentTags" DROP CONSTRAINT "ContentTags_tagId_fkey";

-- DropForeignKey
ALTER TABLE "_ContentTags" DROP CONSTRAINT "_ContentTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContentTags" DROP CONSTRAINT "_ContentTags_B_fkey";

-- DropTable
DROP TABLE "ContentTags";

-- DropTable
DROP TABLE "_ContentTags";

-- CreateTable
CREATE TABLE "_ContentToTags" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ContentToTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ContentToTags_B_index" ON "_ContentToTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Share_id_key" ON "Share"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Share_hash_key" ON "Share"("hash");

-- AddForeignKey
ALTER TABLE "_ContentToTags" ADD CONSTRAINT "_ContentToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentToTags" ADD CONSTRAINT "_ContentToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
