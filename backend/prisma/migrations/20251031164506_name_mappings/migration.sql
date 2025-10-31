/*
  Warnings:

  - You are about to drop the `Edge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Graph` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Node` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Edge";

-- DropTable
DROP TABLE "public"."Graph";

-- DropTable
DROP TABLE "public"."Node";

-- CreateTable
CREATE TABLE "graphs" (
    "id" SERIAL NOT NULL,
    "is_directed" BOOLEAN NOT NULL,

    CONSTRAINT "graphs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nodes" (
    "id" SERIAL NOT NULL,
    "dispaly_value" TEXT,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,

    CONSTRAINT "nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edges" (
    "id" SERIAL NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "is_directed" BOOLEAN NOT NULL,

    CONSTRAINT "edges_pkey" PRIMARY KEY ("id")
);
