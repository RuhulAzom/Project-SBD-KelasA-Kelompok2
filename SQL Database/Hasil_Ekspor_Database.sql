-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 03 Jul 2024 pada 14.43
-- Versi server: 8.0.34
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project_sbd_test`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `account`
--

CREATE TABLE `account` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('Admin','Staff') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Staff'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `account`
--

INSERT INTO `account` (`id`, `username`, `password`, `createAt`, `updateAt`, `email`, `role`) VALUES
('e2770fcb-ee9d-4ba6-9e40-e107010f8bfa', 'Staff', '$2b$10$JKlSEqKiNyCEEMilpbC/ZObC/ykzFo1nPtqJto6ytr4O9APgx6iSW', '2024-06-28 12:21:32.134', '2024-06-28 12:21:32.134', NULL, 'Staff'),
('ee7e5448-9617-4d6d-a58e-2a518ac45c6f', 'Admin', '$2b$10$1ROYKWH43/zwwzh71QLxSOPmOBhiWI85pKF3Kwni8osl9Vr89niVy', '2024-06-28 12:20:20.219', '2024-06-28 12:20:20.219', NULL, 'Admin');

-- --------------------------------------------------------

--
-- Struktur dari tabel `customer`
--

CREATE TABLE `customer` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telp` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `customer`
--

INSERT INTO `customer` (`id`, `nama`, `telp`, `alamat`, `createAt`, `updateAt`) VALUES
('1bdd183b-5afc-4caa-869e-3caac0376a92', 'Habib Adli', '0812344554', 'jl ada aja', '2024-07-02 07:08:35.952', '2024-07-02 07:08:35.952'),
('604ee05c-138b-42f3-8850-1a1721662848', 'Tiffani', '087676677685', 'Jl. Pasar Baru', '2024-07-02 05:33:36.474', '2024-07-02 05:33:36.474'),
('69a4f06d-b9b5-420d-910f-80466b36a283', 'Yasin', '086426363274', 'Jl. Vincent', '2024-07-02 05:31:27.804', '2024-07-02 05:31:27.804'),
('6ac3f963-2077-4677-a80a-7a320290636a', 'Ikshan', '081278812394', 'Jl. Pauh', '2024-06-14 07:11:01.772', '2024-06-14 07:11:01.772'),
('6cf3ff05-d5db-433f-8700-109026d0e55f', 'Imam aja', '082293746373', 'Unand', '2024-06-29 11:29:16.468', '2024-06-29 11:29:16.468'),
('e35774c1-9724-40dd-9bc9-62e225869af3', 'Daud', '082212345678', 'Jl Mewing', '2024-07-02 09:19:54.977', '2024-07-02 09:19:54.977');

-- --------------------------------------------------------

--
-- Struktur dari tabel `layanan`
--

CREATE TABLE `layanan` (
  `id_layanan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `layanan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `layanan`
--

INSERT INTO `layanan` (`id_layanan`, `layanan`) VALUES
('5ede9269-7e44-42aa-a89a-5ce035a19edc', 'HELAIAN'),
('a11a0e72-c7fe-4589-bccb-a1a670eb3dfe', 'KILOAN');

-- --------------------------------------------------------

--
-- Struktur dari tabel `layanan_detail`
--

CREATE TABLE `layanan_detail` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_layanan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `layanan_detail` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `harga` int NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `layanan_detail`
--

INSERT INTO `layanan_detail` (`id`, `id_layanan`, `layanan_detail`, `harga`, `createAt`, `updateAt`) VALUES
('18ed8c71-63d9-4c06-9093-f54b55b38fb7', 'a11a0e72-c7fe-4589-bccb-a1a670eb3dfe', 'Cuci Kering', 4000, '2024-06-14 07:08:32.273', '2024-06-14 07:08:32.273'),
('3e5f9dc6-f57a-454f-8180-50945bf505f3', '5ede9269-7e44-42aa-a89a-5ce035a19edc', 'Bed Cover', 22000, '2024-06-14 07:09:31.947', '2024-06-14 07:09:31.947'),
('4a1ad864-a957-43cf-a8bf-f360fc46ba3d', '5ede9269-7e44-42aa-a89a-5ce035a19edc', 'Sprei', 10000, '2024-06-14 07:09:06.093', '2024-06-14 07:09:06.093'),
('887bb1c0-92d4-4775-a043-fdcfaf4d01d2', '5ede9269-7e44-42aa-a89a-5ce035a19edc', 'Selimut', 15000, '2024-06-14 07:08:51.037', '2024-06-14 07:08:51.037'),
('c6847014-2ac0-4859-a6fd-3ad034f4de50', 'a11a0e72-c7fe-4589-bccb-a1a670eb3dfe', 'Cuci Komplit', 6000, '2024-06-14 07:10:04.948', '2024-06-14 07:10:04.948'),
('ce410254-b3a7-4245-b02a-ec76c578b617', '5ede9269-7e44-42aa-a89a-5ce035a19edc', 'Jas', 20000, '2024-06-27 12:14:44.464', '2024-06-27 12:14:44.464');

-- --------------------------------------------------------

--
-- Struktur dari tabel `staff`
--

CREATE TABLE `staff` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nama` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telp` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `staff`
--

INSERT INTO `staff` (`id`, `nama`, `telp`, `alamat`, `createAt`, `updateAt`) VALUES
('0d3e047f-96a0-42fc-9b77-9235f94dcd5f', 'Fajri', '083423489898', 'Jl. Bakti', '2024-07-02 05:21:20.384', '2024-07-02 05:21:20.384'),
('2badb15a-437c-46bd-b09a-df5a3a38cd32', 'Daud', '08229364726', 'Jl. Gadut', '2024-06-29 11:28:48.492', '2024-06-29 11:28:48.492'),
('2e9450ee-8aea-4252-8a2c-1884b249b163', 'Ruhulk', '081243535344', 'Jl. UNP', '2024-07-02 05:20:47.482', '2024-07-02 05:20:47.482'),
('6d1d5c20-a687-435a-8a1d-eb82b4de76dd', 'Rafki', '082183498721', 'Jl. Muhammad Hatta', '2024-06-14 07:11:55.030', '2024-06-14 07:11:55.030'),
('9929f447-2764-4628-9cbc-66d2490fa041', 'Lucky', '082183498721', 'Jl. Unand', '2024-06-14 07:11:36.665', '2024-06-14 07:11:36.665'),
('9a3b1650-5d1f-43fb-b64c-e146e12ebb73', 'Aini', '089787865687', 'Jl. Unand', '2024-07-02 05:21:58.758', '2024-07-02 05:21:58.758');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi`
--

CREATE TABLE `transaksi` (
  `nota` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_masuk` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `tanggal_keluar` datetime(3) DEFAULT NULL,
  `id_customer` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_staff` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `transaksi`
--

INSERT INTO `transaksi` (`nota`, `tanggal_masuk`, `tanggal_keluar`, `id_customer`, `id_staff`) VALUES
('TKD-10AZT', '2024-07-02 05:32:19.972', NULL, '6ac3f963-2077-4677-a80a-7a320290636a', '0d3e047f-96a0-42fc-9b77-9235f94dcd5f'),
('TKD-11AZT', '2024-07-02 05:33:51.923', NULL, '604ee05c-138b-42f3-8850-1a1721662848', '9a3b1650-5d1f-43fb-b64c-e146e12ebb73'),
('TKD-12AZT', '2024-07-02 05:37:17.686', '2024-07-02 07:58:22.347', '6ac3f963-2077-4677-a80a-7a320290636a', '9929f447-2764-4628-9cbc-66d2490fa041'),
('TKD-13AZT', '2024-07-02 06:41:38.391', NULL, '6ac3f963-2077-4677-a80a-7a320290636a', '0d3e047f-96a0-42fc-9b77-9235f94dcd5f'),
('TKD-14AZT', '2024-07-02 09:11:09.327', '2024-07-02 09:12:16.520', '1bdd183b-5afc-4caa-869e-3caac0376a92', '0d3e047f-96a0-42fc-9b77-9235f94dcd5f'),
('TKD-15AZT', '2024-07-03 00:51:38.355', NULL, '1bdd183b-5afc-4caa-869e-3caac0376a92', '2e9450ee-8aea-4252-8a2c-1884b249b163'),
('TKD-2AZT', '2024-06-28 01:11:34.514', '2024-07-02 05:29:03.241', '6ac3f963-2077-4677-a80a-7a320290636a', '9929f447-2764-4628-9cbc-66d2490fa041'),
('TKD-6AZT', '2024-06-28 08:35:29.222', '2024-06-28 09:42:41.991', '6ac3f963-2077-4677-a80a-7a320290636a', '9929f447-2764-4628-9cbc-66d2490fa041'),
('TKD-7AZT', '2024-07-02 05:29:27.284', '2024-07-02 06:42:21.372', '6cf3ff05-d5db-433f-8700-109026d0e55f', '2badb15a-437c-46bd-b09a-df5a3a38cd32'),
('TKD-8AZT', '2024-07-02 05:30:19.777', NULL, '6cf3ff05-d5db-433f-8700-109026d0e55f', '2e9450ee-8aea-4252-8a2c-1884b249b163');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi_detail`
--

CREATE TABLE `transaksi_detail` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nota` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_harga` double NOT NULL,
  `id_layanan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `berat` double DEFAULT NULL,
  `jumlah_barang` int DEFAULT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `transaksi_detail`
--

INSERT INTO `transaksi_detail` (`id`, `nota`, `total_harga`, `id_layanan`, `berat`, `jumlah_barang`, `createAt`, `updateAt`) VALUES
('2ab24df6-f2b9-4228-8b77-ecb70518c583', 'TKD-14AZT', 28000, 'c6847014-2ac0-4859-a6fd-3ad034f4de50', 7, NULL, '2024-07-02 09:11:09.346', '2024-07-02 09:11:09.346'),
('3092d88e-f496-46e5-b3af-2a8cb5172137', 'TKD-12AZT', 24000, '18ed8c71-63d9-4c06-9093-f54b55b38fb7', 4, NULL, '2024-07-02 05:37:17.691', '2024-07-02 05:37:17.691'),
('46c253a7-b722-4ff9-afb8-43986454445b', 'TKD-14AZT', 22000, '3e5f9dc6-f57a-454f-8180-50945bf505f3', NULL, 1, '2024-07-02 09:11:09.346', '2024-07-02 09:11:09.346'),
('63cc8a82-4ad3-4d14-96c1-1c4eb696d8a8', 'TKD-6AZT', 36000, '18ed8c71-63d9-4c06-9093-f54b55b38fb7', 6, NULL, '2024-06-28 08:35:29.229', '2024-06-28 08:35:29.229'),
('7e3959a2-4f31-4635-af79-b250839e9c0f', 'TKD-7AZT', 30000, '18ed8c71-63d9-4c06-9093-f54b55b38fb7', 5, NULL, '2024-07-02 05:29:27.295', '2024-07-02 05:29:27.295'),
('80b6b5dc-3e79-4f14-83cc-c3195fca5b6b', 'TKD-13AZT', 24000, 'c6847014-2ac0-4859-a6fd-3ad034f4de50', 6, NULL, '2024-07-02 06:41:38.398', '2024-07-02 06:41:38.398'),
('91dce1b9-6dd9-4c89-af4d-b3f24ed9e4b7', 'TKD-8AZT', 60000, 'ce410254-b3a7-4245-b02a-ec76c578b617', NULL, 3, '2024-07-02 05:30:19.785', '2024-07-02 05:30:19.785'),
('99becf64-468e-4e40-8282-c193b3c2ddff', 'TKD-6AZT', 30000, '887bb1c0-92d4-4775-a043-fdcfaf4d01d2', NULL, 2, '2024-06-28 08:35:29.229', '2024-06-28 08:35:29.229'),
('b8158cb2-17c3-4854-b115-d4f1e74da0f5', 'TKD-15AZT', 8000, '18ed8c71-63d9-4c06-9093-f54b55b38fb7', 2, NULL, '2024-07-03 00:51:38.375', '2024-07-03 00:51:38.375'),
('cf7abee0-d589-45c2-b9da-bedec07e098f', 'TKD-10AZT', 36000, 'c6847014-2ac0-4859-a6fd-3ad034f4de50', 9, NULL, '2024-07-02 05:32:19.981', '2024-07-02 05:32:19.981'),
('d77a512c-23e9-4be4-b9ef-02bb44c6e9d9', 'TKD-12AZT', 20000, 'ce410254-b3a7-4245-b02a-ec76c578b617', NULL, 1, '2024-07-02 05:37:17.691', '2024-07-02 05:37:17.691'),
('ea3e6634-c76b-4085-8b4c-262972c29942', 'TKD-15AZT', 30000, '4a1ad864-a957-43cf-a8bf-f360fc46ba3d', NULL, 3, '2024-07-03 00:51:38.375', '2024-07-03 00:51:38.375'),
('f7fdda53-822f-41f5-9b10-dd82495f28f0', 'TKD-11AZT', 60000, 'ce410254-b3a7-4245-b02a-ec76c578b617', NULL, 3, '2024-07-02 05:33:51.934', '2024-07-02 05:33:51.934');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Account_username_key` (`username`),
  ADD UNIQUE KEY `Account_email_key` (`email`);

--
-- Indeks untuk tabel `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `layanan`
--
ALTER TABLE `layanan`
  ADD PRIMARY KEY (`id_layanan`);

--
-- Indeks untuk tabel `layanan_detail`
--
ALTER TABLE `layanan_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Layanan_Detail_id_layanan_fkey` (`id_layanan`);

--
-- Indeks untuk tabel `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`nota`),
  ADD KEY `Transaksi_id_customer_fkey` (`id_customer`),
  ADD KEY `Transaksi_id_staff_fkey` (`id_staff`);

--
-- Indeks untuk tabel `transaksi_detail`
--
ALTER TABLE `transaksi_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Transaksi_Detail_nota_fkey` (`nota`),
  ADD KEY `Transaksi_Detail_id_layanan_fkey` (`id_layanan`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `layanan_detail`
--
ALTER TABLE `layanan_detail`
  ADD CONSTRAINT `Layanan_Detail_id_layanan_fkey` FOREIGN KEY (`id_layanan`) REFERENCES `layanan` (`id_layanan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `Transaksi_id_customer_fkey` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Transaksi_id_staff_fkey` FOREIGN KEY (`id_staff`) REFERENCES `staff` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transaksi_detail`
--
ALTER TABLE `transaksi_detail`
  ADD CONSTRAINT `Transaksi_Detail_id_layanan_fkey` FOREIGN KEY (`id_layanan`) REFERENCES `layanan_detail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Transaksi_Detail_nota_fkey` FOREIGN KEY (`nota`) REFERENCES `transaksi` (`nota`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
