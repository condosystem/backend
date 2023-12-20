-- AlterTable
ALTER TABLE "ministrys" ADD COLUMN     "ksId" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "sectors" ADD COLUMN     "ksId" SERIAL NOT NULL,
ALTER COLUMN "description" SET DEFAULT 'Nenhuma.';

-- CreateTable
CREATE TABLE "sections" (
    "id" TEXT NOT NULL,
    "ksId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unitysection" (
    "id" TEXT NOT NULL,
    "ksId" SERIAL NOT NULL,
    "sectionId" TEXT NOT NULL,
    "unityId" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "unitysection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "unitysection" ADD CONSTRAINT "unitysection_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unitysection" ADD CONSTRAINT "unitysection_unityId_fkey" FOREIGN KEY ("unityId") REFERENCES "unity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
