-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 11, 2021 at 03:36 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vehiclesrent`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_cities`
--

CREATE TABLE `tb_cities` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_cities`
--

INSERT INTO `tb_cities` (`id`, `name`) VALUES
(1, 'Bali'),
(2, 'Yogyakarta'),
(3, 'Jakarta'),
(4, 'Kalimantan'),
(5, 'Malang');

-- --------------------------------------------------------

--
-- Table structure for table `tb_histories`
--

CREATE TABLE `tb_histories` (
  `id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `price` varchar(255) NOT NULL,
  `from_date` datetime DEFAULT NULL,
  `to_date` datetime DEFAULT NULL,
  `rating` char(5) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `testimonial` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_histories`
--

INSERT INTO `tb_histories` (`id`, `vehicle_id`, `user_id`, `price`, `from_date`, `to_date`, `rating`, `status`, `testimonial`) VALUES
(1, 1, 5, '', NULL, NULL, '', '', ''),
(2, 4, 5, '', NULL, NULL, '', '', ''),
(3, 1, 7, '', NULL, NULL, '', '', ''),
(4, 8, 2, '', NULL, NULL, '', '', ''),
(5, 3, 1, '', NULL, NULL, '', '', ''),
(6, 6, 3, '', NULL, NULL, '', '', ''),
(7, 1, 1, '', NULL, NULL, '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `tb_payment`
--

CREATE TABLE `tb_payment` (
  `id` int(11) NOT NULL,
  `nasd` varchar(255) NOT NULL,
  `sd` varchar(255) NOT NULL,
  `sad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tb_reservations`
--

CREATE TABLE `tb_reservations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `order_qurantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tb_types`
--

CREATE TABLE `tb_types` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_types`
--

INSERT INTO `tb_types` (`id`, `name`) VALUES
(1, 'Cars'),
(2, 'Motorbike'),
(3, 'Bike');

-- --------------------------------------------------------

--
-- Table structure for table `tb_users`
--

CREATE TABLE `tb_users` (
  `id` int(11) NOT NULL,
  `picture` text NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `number_phone` char(15) NOT NULL,
  `gender` enum('Female','Male') NOT NULL,
  `dob` date DEFAULT NULL,
  `reg_date` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `upd_date` datetime DEFAULT NULL,
  `status` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_users`
--

INSERT INTO `tb_users` (`id`, `picture`, `full_name`, `username`, `password`, `email`, `address`, `number_phone`, `gender`, `dob`, `reg_date`, `upd_date`, `status`) VALUES
(1, '', 'Leon Scott Kennedy', 'leonsken', '$2b$10$NKD8PjpXcEZe5fubxB44cukmOo6ihujicTReMZoEqcOmXg6cnO7oy', 'leon@gmail.com', 'Jl Garuda I Gg Mangga II', '0812131333104', 'Male', '1997-11-07', '2021-08-11 12:53:59', NULL, 1),
(2, '', 'Chris Redfield', 'chrisred', '$2b$10$k.fFMk9n.itIuDMLqU8KQOJm8y9dszx6hfUp/EXBbFTXQMhCooZFa', 'chris@gmail.com', 'Komplek Indah Melati', '0851555677298', 'Male', '1995-01-12', '2021-08-11 12:54:03', NULL, 1),
(3, '', 'Ada Wong', 'adawong', '$2b$10$6I.4cqDALp0PvmQFXjhbcu/b3DJdQyMY/hepN8qNgPs7Y6C2OR3.O', 'wong@gmail.com', 'Sawangan Pancoran Emas', '0831221251421', 'Female', '1996-12-01', '2021-08-08 20:11:34', NULL, 1),
(4, '', 'Albert Wesker', 'albertwes', '$2b$10$ZKhDdFsimuPJAZmG2EAx2uArn7ebXlK8ncQpkEO0OJkPr5pd/48oy', 'albert@gmail.com', 'Jl Racoon Nurul Huda', '0823217421442', 'Male', '1990-01-01', '2021-08-08 20:11:38', NULL, 0),
(5, '', 'Sharley Birkin', 'sharleybir', '$2b$10$yFI4Hu9scoHC5xDVlFiu.OnFAdRjuwf75wUxe8/npnWfx.jPjMSri', 'sharley@gmail.com', 'Perumahan Ciracas Bekasi', '0851515151242', 'Female', '1990-05-23', '2021-08-11 12:54:06', NULL, 0),
(6, '', 'Claire Redfield', 'clairered', '$2b$10$TRUxMKBRUr6K6mo2H9B.Cex4JKKxezgRIP.x.DJSTiS2AvFO0/8h6', 'claire@gmail.com', 'Kawasan Industri', '0812312412244', 'Female', '1999-09-17', '2021-08-08 20:11:45', NULL, 0),
(7, '', 'Jill Valentine', 'jillval', '$2b$10$6uVQLFVN2L1XLMhd4YG1aOBQurp5fUt2iU8S9VBrPkIyhULe1MWL6', 'jill@gmail.com', 'Karawangan Barat', '0892312412423', 'Female', '1850-03-01', '2021-08-08 20:11:48', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tb_vehicles`
--

CREATE TABLE `tb_vehicles` (
  `id` int(5) NOT NULL,
  `picture` text NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(25) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `type_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_vehicles`
--

INSERT INTO `tb_vehicles` (`id`, `picture`, `name`, `price`, `quantity`, `type_id`, `city_id`, `user_id`) VALUES
(1, '', 'Van', 1000000, '1', 1, 2, 1),
(2, '', 'Lamborghini', 8000000, '1', 1, 3, 1),
(3, '', 'Jeep', 800000, '1', 1, 5, 2),
(4, '', 'White Jeep', 900000, '1', 1, 4, 2),
(5, '', 'Vespa', 300000, '1', 2, 2, 3),
(6, '', 'Honda KLX', 300000, '1', 2, 4, 1),
(7, '', 'Honda', 300000, '1', 2, 5, 2),
(8, '', 'Matic Bike', 200000, '1', 2, 2, 1),
(9, '', 'Sport Bike', 150000, '1', 3, 4, 2),
(10, '', 'Onthel', 200000, '1', 3, 5, 1),
(11, '', 'Fixie Gray', 120000, '1', 3, 2, 1),
(12, '', 'Fixie', 200000, '1', 3, 2, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_cities`
--
ALTER TABLE `tb_cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_histories`
--
ALTER TABLE `tb_histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_vehicle` (`vehicle_id`),
  ADD KEY `id_user` (`user_id`);

--
-- Indexes for table `tb_payment`
--
ALTER TABLE `tb_payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_reservations`
--
ALTER TABLE `tb_reservations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_types`
--
ALTER TABLE `tb_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_users`
--
ALTER TABLE `tb_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_vehicles`
--
ALTER TABLE `tb_vehicles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `types_id` (`type_id`),
  ADD KEY `citys_id` (`city_id`),
  ADD KEY `users_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_cities`
--
ALTER TABLE `tb_cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tb_histories`
--
ALTER TABLE `tb_histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tb_payment`
--
ALTER TABLE `tb_payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_reservations`
--
ALTER TABLE `tb_reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_types`
--
ALTER TABLE `tb_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_users`
--
ALTER TABLE `tb_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tb_vehicles`
--
ALTER TABLE `tb_vehicles`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_histories`
--
ALTER TABLE `tb_histories`
  ADD CONSTRAINT `tb_histories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tb_users` (`id`),
  ADD CONSTRAINT `tb_histories_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `tb_vehicles` (`id`);

--
-- Constraints for table `tb_vehicles`
--
ALTER TABLE `tb_vehicles`
  ADD CONSTRAINT `tb_vehicles_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `tb_cities` (`id`),
  ADD CONSTRAINT `tb_vehicles_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `tb_types` (`id`),
  ADD CONSTRAINT `tb_vehicles_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `tb_users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
