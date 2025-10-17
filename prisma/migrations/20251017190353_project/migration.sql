-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "thumbnail" TEXT,
    "features" TEXT[],
    "description" TEXT NOT NULL,
    "liveSite" TEXT NOT NULL,
    "liveLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
