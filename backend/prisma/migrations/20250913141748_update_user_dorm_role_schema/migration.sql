/*
  Warnings:

  - A unique constraint covering the columns `[user_id,dorm_id,role]` on the table `UserDormRole` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."UserDormRole_user_id_dorm_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserDormRole_user_id_dorm_id_role_key" ON "public"."UserDormRole"("user_id", "dorm_id", "role");
