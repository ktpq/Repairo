-- AlterTable
ALTER TABLE "public"."Request" ADD COLUMN     "dorm_id" INTEGER,
ADD COLUMN     "room_id" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Request" ADD CONSTRAINT "Request_dorm_id_fkey" FOREIGN KEY ("dorm_id") REFERENCES "public"."Dorm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Request" ADD CONSTRAINT "Request_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
