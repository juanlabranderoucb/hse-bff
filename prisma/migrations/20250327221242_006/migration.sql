/*
  Warnings:

  - You are about to drop the column `substandardConditionId` on the `SubstandardConditionReportLike` table. All the data in the column will be lost.
  - You are about to drop the column `substandardConditionId` on the `SubstandardConditionReportReply` table. All the data in the column will be lost.
  - Added the required column `location` to the `SubstandardConditionReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `substandardConditionReportId` to the `SubstandardConditionReportLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `substandardConditionReportId` to the `SubstandardConditionReportReply` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SubstandardConditionReportLike" DROP CONSTRAINT "SubstandardConditionReportLike_substandardConditionId_fkey";

-- DropForeignKey
ALTER TABLE "SubstandardConditionReportReply" DROP CONSTRAINT "SubstandardConditionReportReply_substandardConditionId_fkey";

-- AlterTable
ALTER TABLE "SubstandardConditionReport" ADD COLUMN     "location" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SubstandardConditionReportLike" DROP COLUMN "substandardConditionId",
ADD COLUMN     "substandardConditionReportId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SubstandardConditionReportReply" DROP COLUMN "substandardConditionId",
ADD COLUMN     "substandardConditionReportId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SubstandardConditionReportImpact" (
    "id" SERIAL NOT NULL,
    "substandardConditionReportId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "SubstandardConditionReportImpact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubstandardConditionReportSuggestedFix" (
    "id" SERIAL NOT NULL,
    "substandardConditionReportId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "SubstandardConditionReportSuggestedFix_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubstandardConditionReportAppliedFix" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "substandardConditionReportId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "SubstandardConditionReportAppliedFix_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubstandardConditionReportImpact" ADD CONSTRAINT "SubstandardConditionReportImpact_substandardConditionRepor_fkey" FOREIGN KEY ("substandardConditionReportId") REFERENCES "SubstandardConditionReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubstandardConditionReportSuggestedFix" ADD CONSTRAINT "SubstandardConditionReportSuggestedFix_substandardConditio_fkey" FOREIGN KEY ("substandardConditionReportId") REFERENCES "SubstandardConditionReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubstandardConditionReportAppliedFix" ADD CONSTRAINT "SubstandardConditionReportAppliedFix_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubstandardConditionReportAppliedFix" ADD CONSTRAINT "SubstandardConditionReportAppliedFix_substandardConditionR_fkey" FOREIGN KEY ("substandardConditionReportId") REFERENCES "SubstandardConditionReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubstandardConditionReportLike" ADD CONSTRAINT "SubstandardConditionReportLike_substandardConditionReportI_fkey" FOREIGN KEY ("substandardConditionReportId") REFERENCES "SubstandardConditionReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubstandardConditionReportReply" ADD CONSTRAINT "SubstandardConditionReportReply_substandardConditionReport_fkey" FOREIGN KEY ("substandardConditionReportId") REFERENCES "SubstandardConditionReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
