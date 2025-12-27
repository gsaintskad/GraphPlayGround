/*
  Warnings:

  - Added the required column `createdById` to the `graphs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "edges" DROP CONSTRAINT "edges_graphId_fkey";

-- DropForeignKey
ALTER TABLE "nodes" DROP CONSTRAINT "nodes_graphId_fkey";

-- AlterTable
ALTER TABLE "graphs" ADD COLUMN     "createdById" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SharedWith" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SharedWith_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "_SharedWith_B_index" ON "_SharedWith"("B");

-- AddForeignKey
ALTER TABLE "graphs" ADD CONSTRAINT "graphs_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nodes" ADD CONSTRAINT "nodes_graphId_fkey" FOREIGN KEY ("graphId") REFERENCES "graphs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edges" ADD CONSTRAINT "edges_graphId_fkey" FOREIGN KEY ("graphId") REFERENCES "graphs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SharedWith" ADD CONSTRAINT "_SharedWith_A_fkey" FOREIGN KEY ("A") REFERENCES "graphs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SharedWith" ADD CONSTRAINT "_SharedWith_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
