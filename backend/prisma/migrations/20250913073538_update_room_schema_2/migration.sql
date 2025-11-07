/*
  Warnings:

  - Changed the type of `number` on the `Room` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Room" DROP COLUMN "number",
ADD COLUMN     "number" INTEGER NOT NULL;
