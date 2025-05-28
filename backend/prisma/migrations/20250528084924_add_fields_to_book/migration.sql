/*
  Warnings:

  - A unique constraint covering the columns `[isbn]` on the table `book` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `book` ADD COLUMN `coverimage` VARCHAR(191) NULL,
    ADD COLUMN `isbn` VARCHAR(191) NULL,
    ADD COLUMN `jumlaheksemplar` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `kategori` VARCHAR(191) NULL,
    ADD COLUMN `lokasirak` VARCHAR(191) NULL,
    ADD COLUMN `sinopsis` VARCHAR(191) NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'available';

-- CreateIndex
CREATE UNIQUE INDEX `book_isbn_key` ON `book`(`isbn`);
