-- AlterTable
ALTER TABLE "public"."UserDormRole" ADD COLUMN     "room_id" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."UserDormRole" ADD CONSTRAINT "UserDormRole_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
