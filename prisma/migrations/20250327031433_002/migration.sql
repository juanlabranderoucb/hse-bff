-- CreateTable
CREATE TABLE "SubstandardConditionReport" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "SubstandardConditionReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubstandardConditionReportLike" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "substandardConditionId" INTEGER NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "SubstandardConditionReportLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubstandardConditionReportReply" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "substandardConditionId" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "SubstandardConditionReportReply_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubstandardConditionReport" ADD CONSTRAINT "SubstandardConditionReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubstandardConditionReportLike" ADD CONSTRAINT "SubstandardConditionReportLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubstandardConditionReportLike" ADD CONSTRAINT "SubstandardConditionReportLike_substandardConditionId_fkey" FOREIGN KEY ("substandardConditionId") REFERENCES "SubstandardConditionReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubstandardConditionReportReply" ADD CONSTRAINT "SubstandardConditionReportReply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubstandardConditionReportReply" ADD CONSTRAINT "SubstandardConditionReportReply_substandardConditionId_fkey" FOREIGN KEY ("substandardConditionId") REFERENCES "SubstandardConditionReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
