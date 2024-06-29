-- CreateTable
CREATE TABLE `Customer` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `telp` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Staff` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `telp` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaksi` (
    `nota` VARCHAR(191) NOT NULL,
    `id_customer` VARCHAR(191) NOT NULL,
    `id_staff` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`nota`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaksi_Detail` (
    `nota` VARCHAR(191) NOT NULL,
    `total_harga` INTEGER NOT NULL,
    `tanggal_masuk` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tanggal_keluar` DATETIME(3) NULL,
    `id_layanan` VARCHAR(191) NOT NULL,
    `berat` INTEGER NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`nota`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Layanan` (
    `id_layanan` VARCHAR(191) NOT NULL,
    `layanan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_layanan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Layanan_Detail` (
    `id` VARCHAR(191) NOT NULL,
    `id_layanan` VARCHAR(191) NOT NULL,
    `layanan_detail` VARCHAR(191) NOT NULL,
    `harga` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_id_customer_fkey` FOREIGN KEY (`id_customer`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_id_staff_fkey` FOREIGN KEY (`id_staff`) REFERENCES `Staff`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaksi` ADD CONSTRAINT `Transaksi_nota_fkey` FOREIGN KEY (`nota`) REFERENCES `Transaksi_Detail`(`nota`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaksi_Detail` ADD CONSTRAINT `Transaksi_Detail_id_layanan_fkey` FOREIGN KEY (`id_layanan`) REFERENCES `Layanan_Detail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Layanan_Detail` ADD CONSTRAINT `Layanan_Detail_id_layanan_fkey` FOREIGN KEY (`id_layanan`) REFERENCES `Layanan`(`id_layanan`) ON DELETE RESTRICT ON UPDATE CASCADE;
