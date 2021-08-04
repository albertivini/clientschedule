/*
  Warnings:

  - You are about to drop the column `data` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `horario` on the `appointments` table. All the data in the column will be lost.
  - Added the required column `dateTime` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_customers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL
);
INSERT INTO "new_customers" ("birthday", "cpf", "email", "id", "name", "telefone") SELECT "birthday", "cpf", "email", "id", "name", "telefone" FROM "customers";
DROP TABLE "customers";
ALTER TABLE "new_customers" RENAME TO "customers";
CREATE UNIQUE INDEX "customers.cpf_unique" ON "customers"("cpf");
CREATE TABLE "new_appointments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dateTime" TEXT NOT NULL,
    "return" BOOLEAN NOT NULL DEFAULT false,
    "idCustomer" TEXT NOT NULL,
    FOREIGN KEY ("idCustomer") REFERENCES "customers" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_appointments" ("id", "idCustomer", "return") SELECT "id", "idCustomer", "return" FROM "appointments";
DROP TABLE "appointments";
ALTER TABLE "new_appointments" RENAME TO "appointments";
CREATE UNIQUE INDEX "appointments_idCustomer_unique" ON "appointments"("idCustomer");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
