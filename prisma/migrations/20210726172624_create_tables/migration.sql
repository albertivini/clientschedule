-- CreateTable
CREATE TABLE "customers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthday" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" DATETIME NOT NULL,
    "horario" DATETIME NOT NULL,
    "return" BOOLEAN NOT NULL DEFAULT false,
    "idCustomer" TEXT NOT NULL,
    FOREIGN KEY ("idCustomer") REFERENCES "customers" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "medicaments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "idAppointment" TEXT NOT NULL,
    "idCustomer" TEXT NOT NULL,
    FOREIGN KEY ("idAppointment") REFERENCES "appointments" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("idCustomer") REFERENCES "customers" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "customers.cpf_unique" ON "customers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "appointments_idCustomer_unique" ON "appointments"("idCustomer");

-- CreateIndex
CREATE UNIQUE INDEX "medicaments_idAppointment_unique" ON "medicaments"("idAppointment");

-- CreateIndex
CREATE UNIQUE INDEX "medicaments_idCustomer_unique" ON "medicaments"("idCustomer");
