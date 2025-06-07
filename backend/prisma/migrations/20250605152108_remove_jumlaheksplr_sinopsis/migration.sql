/*
  Warnings:

  - You are about to drop the column `jumlaheksemplar` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `sinopsis` on the `book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `book` DROP COLUMN `jumlaheksemplar`,
    DROP COLUMN `sinopsis`;
