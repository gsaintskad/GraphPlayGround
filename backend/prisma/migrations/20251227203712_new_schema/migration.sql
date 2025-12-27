/*
  Warnings:

  - You are about to drop the column `is_directed` on the `graphs` table. All the data in the column will be lost.
  - You are about to drop the column `dispaly_value` on the `nodes` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[originalId]` on the table `edges` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[originalId]` on the table `nodes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `graphId` to the `edges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalId` to the `edges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceNodeId` to the `edges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetNodeId` to the `edges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `display_value` to the `nodes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `graphId` to the `nodes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalId` to the `nodes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "edges" ADD COLUMN     "graphId" INTEGER NOT NULL,
ADD COLUMN     "originalId" TEXT NOT NULL,
ADD COLUMN     "sourceNodeId" INTEGER NOT NULL,
ADD COLUMN     "targetNodeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "graphs" DROP COLUMN "is_directed",
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "nodes" DROP COLUMN "dispaly_value",
ADD COLUMN     "display_value" TEXT NOT NULL,
ADD COLUMN     "graphId" INTEGER NOT NULL,
ADD COLUMN     "originalId" TEXT NOT NULL,
ALTER COLUMN "x" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "y" SET DATA TYPE DOUBLE PRECISION;

-- DropTable
DROP TABLE "public"."users";

-- CreateIndex
CREATE UNIQUE INDEX "edges_originalId_key" ON "edges"("originalId");

-- CreateIndex
CREATE UNIQUE INDEX "nodes_originalId_key" ON "nodes"("originalId");

-- AddForeignKey
ALTER TABLE "nodes" ADD CONSTRAINT "nodes_graphId_fkey" FOREIGN KEY ("graphId") REFERENCES "graphs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edges" ADD CONSTRAINT "edges_graphId_fkey" FOREIGN KEY ("graphId") REFERENCES "graphs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edges" ADD CONSTRAINT "edges_sourceNodeId_fkey" FOREIGN KEY ("sourceNodeId") REFERENCES "nodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "edges" ADD CONSTRAINT "edges_targetNodeId_fkey" FOREIGN KEY ("targetNodeId") REFERENCES "nodes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
