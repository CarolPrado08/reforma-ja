-- CreateEnum
CREATE TYPE "UserTipo" AS ENUM ('MORADOR', 'PROFISSIONAL');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cnpj" TEXT,
ADD COLUMN     "empresaConfigurada" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "nomeEmpresa" TEXT,
ADD COLUMN     "telefone" TEXT,
ADD COLUMN     "tipo" "UserTipo";
