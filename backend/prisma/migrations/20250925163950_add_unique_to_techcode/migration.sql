/*
  Warnings:

  - A unique constraint covering the columns `[tech_code]` on the table `Dorm` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dorm_tech_code_key" ON "public"."Dorm"("tech_code");
