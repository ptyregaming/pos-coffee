-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 08, 2024 at 10:42 AM
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
-- Database: `coffee`
--

-- --------------------------------------------------------

--
-- Table structure for table `Detail`
--

CREATE TABLE `Detail` (
  `detail_penjualan_id` int(11) NOT NULL,
  `penjualan_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Detail`
--

INSERT INTO `Detail` (`detail_penjualan_id`, `penjualan_id`, `product_id`, `jumlah`, `subtotal`) VALUES
(1, 45323, 5, 20, 2000.00),
(3, 427334, 3, 12, 3232.00),
(189265, 230052, 7, 1, 5000.00),
(194070, 740997, 4, 1, 25000.00),
(324517, 740997, 9, 1, 35.00),
(431809, 740997, 8, 1, 35000.00),
(783138, 541896, 3, 2, 40000.00),
(875297, 740997, 5, 1, 30000.00),
(896756, 230052, 4, 1, 25000.00),
(938325, 541896, 4, 2, 50000.00);

-- --------------------------------------------------------

--
-- Table structure for table `employes`
--

CREATE TABLE `employes` (
  `id` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `email` varchar(500) NOT NULL,
  `profil-pic` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `employes`
--

INSERT INTO `employes` (`id`, `name`, `email`, `profil-pic`) VALUES
(1, 'hardi', 'dardi@gamil.com', 'asdasdasd'),
(2, 'Ha', 'ha@gmail.com', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `Kategori`
--

CREATE TABLE `Kategori` (
  `kategori_id` int(11) NOT NULL,
  `kategori_nama` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Kategori`
--

INSERT INTO `Kategori` (`kategori_id`, `kategori_nama`) VALUES
(6, 'Handcrafted Espresso'),
(7, 'Signature Coffee'),
(8, 'Non Coffee'),
(9, 'Mocktail'),
(10, 'Add Ons'),
(11, 'Bread'),
(12, 'Pizza');

-- --------------------------------------------------------

--
-- Table structure for table `Penjualan`
--

CREATE TABLE `Penjualan` (
  `penjualan_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tanggal_pembelian` date NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `metode` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Penjualan`
--

INSERT INTO `Penjualan` (`penjualan_id`, `user_id`, `tanggal_pembelian`, `total`, `metode`) VALUES
(45323, 1, '2024-12-04', 15.00, 'langsung'),
(111201, 1, '2024-12-07', 90000.00, 'Makan/Minum Di Sini'),
(230052, 11, '2024-12-08', 30000.00, 'Dibungkus'),
(255757, 1, '2024-12-07', 200000.00, 'Makan/Minum Di Sini'),
(350898, 1, '2024-12-07', 90000.00, 'Makan/Minum Di Sini'),
(420850, 1, '2024-12-07', 90000.00, 'Makan/Minum Di Sini'),
(427334, 1, '2024-12-07', 90000.00, 'Makan/Minum Di Sini'),
(440332, 1, '2024-12-07', 70000.00, 'Makan/Minum Di Sini'),
(492242, 1, '2024-12-07', 185000.00, 'Makan/Minum Di Sini'),
(541896, 1, '2024-12-07', 90000.00, 'Makan/Minum Di Sini'),
(589646, 1, '2024-12-07', 90000.00, 'Makan/Minum Di Sini'),
(650084, 1, '2024-12-07', 65000.00, 'Makan/Minum Di Sini'),
(740997, 1, '2024-12-08', 90035.00, 'Dibungkus'),
(741015, 1, '2024-12-07', 65000.00, 'Makan/Minum Di Sini'),
(965065, 1, '2024-12-07', 115000.00, 'Makan/Minum Di Sini');

-- --------------------------------------------------------

--
-- Table structure for table `Produk`
--

CREATE TABLE `Produk` (
  `produk_id` int(11) NOT NULL,
  `kategori_id` int(11) NOT NULL,
  `produk_judul` varchar(100) NOT NULL,
  `produk_harga` int(11) NOT NULL,
  `produk_deskripsi` text NOT NULL,
  `stok` int(100) NOT NULL,
  `produk_image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Produk`
--

INSERT INTO `Produk` (`produk_id`, `kategori_id`, `produk_judul`, `produk_harga`, `produk_deskripsi`, `stok`, `produk_image`) VALUES
(3, 6, 'Espresso', 20000, 'Espresso', 20, 'img_6753ed7f6247b.jpeg'),
(4, 6, 'Doppio', 25000, 'Doppio', 11, 'img_67552ae7ef302.jpeg'),
(5, 6, 'Caffe Americano', 30000, 'Caffe Americano', 16, 'img_67552b4d1b452.jpg'),
(7, 8, 'Teh manis', 5000, 'Teh manis dengan gula asli', 60, 'img_6753c12200eff.jpeg'),
(8, 6, 'Cappuccino', 35000, 'Cappuccino pertama kali muncul di Vienna, Austria pada tahun 1700-an dengan nama \"kapuziner\". Minuman ini dideskripsikan sebagai kopi dengan krim dan gula, dan beberapa literatur menyebutkan bahwa minuman ini juga dicampur dengan sedikit rempah.', 89, 'img_67552c23307e5.jpg'),
(9, 6, 'Caffè latte', 35, 'caffè latte berbeda dengan cappuccino, meskipun keduanya merupakan minuman kopi susu. Perbedaannya terletak pada takaran dan rasanya. Secangkir cappuccino berisi 1/3 espresso, 1/3 steamed milk, dan 1/3 foamed milk, sedangkan secangkir kopi latte mengandung 1 shot espresso, 175 ml - 235 ml steamed milk, dan sedikit foamed milk di atasnya', 43, 'img_67552cac520aa.jpg'),
(10, 7, 'Coffee Susu Jakarta', 35000, 'Coffee susu khas Jakarta', 34, 'img_67552e1b8a5ea.jpg'),
(11, 8, 'Teh Macha', 10000, 'Teh asli dari jepang yang mempunyai rasa khas dan nikmat', 54, 'img_67553c95f0b74.jpeg'),
(12, 11, 'Roti', 3000, 'Fresh bake coffee signature from this cafe', 67, 'img_67556548a4337.jpeg'),
(13, 12, 'Pizza dengan extra keju', 60000, 'Fresh pizza langsung dari oven', 50, 'img_67556664937ef.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `alamat` text NOT NULL,
  `nomorTelepon` varchar(12) NOT NULL,
  `level` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `username`, `password`, `nama`, `alamat`, `nomorTelepon`, `level`, `status`) VALUES
(1, 'admin', 'password', 'Hardiansyah', 'seroja', '081123456789', 'Admin', 1),
(7, 'coke', 'p0l1s1', 'ewwew', 'ewwew', 'wewe', 'costumer', 1),
(9, 'John45', 'password', 'Jhn Cena', 'jl.serayu', '3232435453', 'user', 0),
(10, 'joy', 'password', 'nolep', 'jl.neraka', '7354732343', 'user', 0),
(11, 'ujang45', 'password', 'ujang', 'jl.semerawut no:31q', '081234567890', 'user', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Detail`
--
ALTER TABLE `Detail`
  ADD PRIMARY KEY (`detail_penjualan_id`),
  ADD KEY `penjualan_id` (`penjualan_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `employes`
--
ALTER TABLE `employes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Kategori`
--
ALTER TABLE `Kategori`
  ADD PRIMARY KEY (`kategori_id`);

--
-- Indexes for table `Penjualan`
--
ALTER TABLE `Penjualan`
  ADD PRIMARY KEY (`penjualan_id`),
  ADD KEY `Penjualan_ibfk_1` (`user_id`);

--
-- Indexes for table `Produk`
--
ALTER TABLE `Produk`
  ADD PRIMARY KEY (`produk_id`),
  ADD KEY `kategori_id` (`kategori_id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Detail`
--
ALTER TABLE `Detail`
  MODIFY `detail_penjualan_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=938326;

--
-- AUTO_INCREMENT for table `employes`
--
ALTER TABLE `employes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Kategori`
--
ALTER TABLE `Kategori`
  MODIFY `kategori_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `Penjualan`
--
ALTER TABLE `Penjualan`
  MODIFY `penjualan_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=965066;

--
-- AUTO_INCREMENT for table `Produk`
--
ALTER TABLE `Produk`
  MODIFY `produk_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Detail`
--
ALTER TABLE `Detail`
  ADD CONSTRAINT `Detail_ibfk_1` FOREIGN KEY (`penjualan_id`) REFERENCES `Penjualan` (`penjualan_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Produk` (`produk_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Penjualan`
--
ALTER TABLE `Penjualan`
  ADD CONSTRAINT `Penjualan_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Produk`
--
ALTER TABLE `Produk`
  ADD CONSTRAINT `Produk_ibfk_1` FOREIGN KEY (`kategori_id`) REFERENCES `Kategori` (`kategori_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
