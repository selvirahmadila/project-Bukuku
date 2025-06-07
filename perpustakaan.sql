-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 07, 2025 at 10:04 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `perpustakaan`
--

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `judul` varchar(191) NOT NULL,
  `penulis` varchar(191) NOT NULL,
  `coverimage` varchar(191) DEFAULT NULL,
  `kategori` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `judul`, `penulis`, `coverimage`, `kategori`, `status`) VALUES
(1, 'Atomic Habits', 'Jana Doe', '/uploads/ca81e3c2-87bb-49f4-86d8-0c2db07dcc66_automic habits.jpg', 'Psycolog', 'available'),
(2, 'Algoritma', 'Universitas Teknokrat', '/uploads/2fae1100-324c-46b4-8862-8e4dc50ee43a_automic habits.jpg', 'Teknologi', 'available');

-- --------------------------------------------------------

--
-- Table structure for table `loan`
--

CREATE TABLE `loan` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `bookId` int(11) NOT NULL,
  `loanDate` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `returnDate` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nama` varchar(191) DEFAULT NULL,
  `npm` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `nama`, `npm`, `password`) VALUES
(1, 'Selvi Rahmadila', '123456789', '123456789'),
(3, '22312032', '22312032', '22312032');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('17f0af4b-ed0d-4719-ba10-f9e589cd5c1c', '5738e7cade56db7ddcda0ee93803240600430156a2fcc45205f7111b588f83be', '2025-05-21 14:12:36.094', '20250227132037_tableuser', NULL, NULL, '2025-05-21 14:12:36.053', 1),
('345fda93-8b68-450d-a59a-7f8515fd037b', 'a07a1e6208c3419b6c6e8ef0e4fd746a8f8902637da186e35f22176409ecfe5f', '2025-05-28 08:49:24.961', '20250528084924_add_fields_to_book', NULL, NULL, '2025-05-28 08:49:24.922', 1),
('5862ef6b-3cf5-44c0-aa9c-9c15c7036280', '2edef4b7fb9334623b529f9828ca59371818f32d80494b15940b1ca91eb032f8', '2025-05-21 14:12:36.555', '20250521141236_add_npm_password_to_user', NULL, NULL, '2025-05-21 14:12:36.376', 1),
('5c7845a9-e5d9-46c3-836e-7e0e2e2bc3cb', '502cafac1ba767418c9b8d37b8e5bf765143058387fbd8a0df1683f4c0df8221', '2025-05-28 14:15:46.071', '20250528141545_hapus_isbn_lokasirak', NULL, NULL, '2025-05-28 14:15:46.011', 1),
('f527690e-9789-4872-ac70-a7fd52112ed1', '2823855d5390f47b57d0f4caebc85eddf143012af799965fe724339b35d10f9e', '2025-06-05 15:21:09.558', '20250605152108_remove_jumlaheksplr_sinopsis', NULL, NULL, '2025-06-05 15:21:09.511', 1),
('facde22b-6c8a-4c0f-91b5-c30895377d2e', '72001486d4917a40009a580ba1ced5004a18c4df3dc3f40b341e61cd6ed9c3bf', '2025-06-01 13:50:18.849', '20250601135018_make_nama_optional', NULL, NULL, '2025-06-01 13:50:18.716', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loan`
--
ALTER TABLE `loan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `loan_userId_fkey` (`userId`),
  ADD KEY `loan_bookId_fkey` (`bookId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_npm_key` (`npm`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `loan`
--
ALTER TABLE `loan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `loan`
--
ALTER TABLE `loan`
  ADD CONSTRAINT `loan_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `book` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `loan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
