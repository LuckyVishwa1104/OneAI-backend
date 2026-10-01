/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('LOCAL', 'GOOGLE', 'APPLE');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateTable
CREATE TABLE "AuthIdentity" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "provider" "AuthProvider" NOT NULL,
    "providerUserId" TEXT,
    "passwordHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuthIdentity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthIdentity_provider_providerUserId_key" ON "AuthIdentity"("provider", "providerUserId");

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- AddForeignKey
ALTER TABLE "AuthIdentity" ADD CONSTRAINT "AuthIdentity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
