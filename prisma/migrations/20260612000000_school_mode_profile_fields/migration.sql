-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('GENERAL_LEARNER', 'SCHOOL_STUDENT');

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "userType" "UserType" NOT NULL DEFAULT 'GENERAL_LEARNER',
ADD COLUMN     "educationBoard" TEXT,
ADD COLUMN     "grade" INTEGER;
