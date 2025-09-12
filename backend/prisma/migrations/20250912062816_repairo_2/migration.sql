/*
  Warnings:

  - You are about to drop the column `closing_time` on the `Dorm` table. All the data in the column will be lost.
  - You are about to drop the column `opening_time` on the `Dorm` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Dorm" DROP COLUMN "closing_time",
DROP COLUMN "opening_time";
