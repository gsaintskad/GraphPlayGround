-- CreateTable
CREATE TABLE "Graph" (
    "id" SERIAL NOT NULL,
    "is_directed" BOOLEAN NOT NULL,

    CONSTRAINT "Graph_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Node" (
    "id" SERIAL NOT NULL,
    "dispaly_value" TEXT,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Edge" (
    "id" SERIAL NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "is_directed" BOOLEAN NOT NULL,

    CONSTRAINT "Edge_pkey" PRIMARY KEY ("id")
);
