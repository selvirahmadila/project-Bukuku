-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `npm` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_npm_key`(`npm`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `book` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(191) NOT NULL,
    `penulis` VARCHAR(191) NOT NULL,
    `kategori` VARCHAR(191) NOT NULL,
    `coverimage` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `loan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `bookId` INTEGER NOT NULL,
    `loanDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `returnDate` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `loan` ADD CONSTRAINT `loan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `loan` ADD CONSTRAINT `loan_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
