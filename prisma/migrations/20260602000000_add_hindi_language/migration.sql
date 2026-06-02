-- CreateEnum
CREATE TYPE "TeachingLanguage" AS ENUM ('ru', 'en', 'hi');

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN "teachingLanguage" "TeachingLanguage" NOT NULL DEFAULT 'ru';
