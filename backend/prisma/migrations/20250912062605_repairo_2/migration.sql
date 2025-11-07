-- CreateEnum
CREATE TYPE "public"."request_status" AS ENUM ('pending', 'canceled', 'in_progress', 'completed');

-- CreateEnum
CREATE TYPE "public"."room_status" AS ENUM ('Available', 'Reported', 'Unavailable');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('Owner', 'Tenant', 'Technician');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Dorm" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "dorm_name" TEXT NOT NULL,
    "location" TEXT,
    "phone" TEXT,
    "opening_time" TIMESTAMP(3),
    "closing_time" TIMESTAMP(3),
    "tech_code" TEXT,
    "line_id" TEXT NOT NULL,
    "map_url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dorm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Request" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "topic" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "request_date" TIMESTAMP(3) NOT NULL,
    "image_url" TEXT,
    "submit_image_url" TEXT,
    "status" "public"."request_status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Room" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "dorm_id" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "access_code" TEXT NOT NULL,
    "status" "public"."room_status" NOT NULL DEFAULT 'Available',

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Notification" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "topic" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserDormRole" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "dorm_id" INTEGER NOT NULL,
    "role" "public"."Role" NOT NULL,

    CONSTRAINT "UserDormRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Room_access_code_key" ON "public"."Room"("access_code");

-- CreateIndex
CREATE UNIQUE INDEX "UserDormRole_user_id_dorm_id_key" ON "public"."UserDormRole"("user_id", "dorm_id");

-- AddForeignKey
ALTER TABLE "public"."Dorm" ADD CONSTRAINT "Dorm_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Request" ADD CONSTRAINT "Request_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Room" ADD CONSTRAINT "Room_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Room" ADD CONSTRAINT "Room_dorm_id_fkey" FOREIGN KEY ("dorm_id") REFERENCES "public"."Dorm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserDormRole" ADD CONSTRAINT "UserDormRole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserDormRole" ADD CONSTRAINT "UserDormRole_dorm_id_fkey" FOREIGN KEY ("dorm_id") REFERENCES "public"."Dorm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
