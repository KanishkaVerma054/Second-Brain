/*
  Warnings:

  - The primary key for the `Content` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ContentTags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_ContentTags` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ContentTags" DROP CONSTRAINT "ContentTags_contentId_fkey";

-- DropForeignKey
ALTER TABLE "_ContentTags" DROP CONSTRAINT "_ContentTags_A_fkey";

-- AlterTable
ALTER TABLE "Content" DROP CONSTRAINT "Content_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Content_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Content_id_seq";

-- AlterTable
ALTER TABLE "ContentTags" DROP CONSTRAINT "ContentTags_pkey",
ALTER COLUMN "contentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ContentTags_pkey" PRIMARY KEY ("contentId", "tagId");

-- AlterTable
ALTER TABLE "_ContentTags" DROP CONSTRAINT "_ContentTags_AB_pkey",
ALTER COLUMN "A" SET DATA TYPE TEXT,
ADD CONSTRAINT "_ContentTags_AB_pkey" PRIMARY KEY ("A", "B");

-- AddForeignKey
ALTER TABLE "ContentTags" ADD CONSTRAINT "ContentTags_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentTags" ADD CONSTRAINT "_ContentTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;
