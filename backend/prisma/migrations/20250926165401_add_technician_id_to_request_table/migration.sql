-- AlterTable
ALTER TABLE "public"."Request" ADD COLUMN     "technician_id" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Request" ADD CONSTRAINT "Request_technician_id_fkey" FOREIGN KEY ("technician_id") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
