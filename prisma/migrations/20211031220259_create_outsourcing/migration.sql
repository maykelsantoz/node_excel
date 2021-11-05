-- CreateTable
CREATE TABLE "outsourcing" (
    "id" TEXT NOT NULL,
    "req" TEXT NOT NULL,
    "orc" TEXT NOT NULL,
    "abertura" TEXT NOT NULL,
    "hora_abertura" TEXT NOT NULL,
    "contato" INTEGER NOT NULL,
    "nome_do_cliente" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "equipamento" TEXT NOT NULL,
    "serial" TEXT NOT NULL,
    "solicitante" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "previsao" TEXT NOT NULL,
    "sla" INTEGER NOT NULL,

    CONSTRAINT "outsourcing_pkey" PRIMARY KEY ("id")
);
