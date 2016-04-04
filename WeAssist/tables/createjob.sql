-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2016 at 06:22 PM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `weassist`
--

-- --------------------------------------------------------

--
-- Table structure for table `createjob`
--

CREATE TABLE IF NOT EXISTS `createjob` (
  `subcat_id` int(11) NOT NULL,
  `jobcategory` varchar(50) NOT NULL,
  `subcategory` varchar(50) NOT NULL,
  `jobtitle` varchar(100) NOT NULL,
  `jobdesc` varchar(255) NOT NULL,
  `photo` varchar(120) NOT NULL,
  `uname` varchar(80) NOT NULL,
  `job_price` int(50) DEFAULT NULL,
  `job_date` date NOT NULL,
  `target_date` date NOT NULL,
  `job_time` time(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `createjob`
--

INSERT INTO `createjob` (`subcat_id`, `jobcategory`, `subcategory`, `jobtitle`, `jobdesc`, `photo`, `uname`, `job_price`, `job_date`, `target_date`, `job_time`) VALUES
(2, '6', 'roof', 'Repair', 'Repair wall', 'bg2.jpg', 'sandeep@gmail.com', NULL, '0000-00-00', '0000-00-00', '12:13:14.0'),
(3, '2', 'house', 'TO paint', 'Painting is LIfe', 'avatar5.png', 'sandeep@gmail.com', NULL, '0000-00-00', '0000-00-00', '12:13:14.0'),
(4, '7', 'construction', 'construct', 'break', 'photo4.jpg', 'sodhi@mailinator.com', NULL, '0000-00-00', '0000-00-00', '12:13:14.0'),
(6, '3', 'damage', 'Repairss', 'Repair wallss', 'bg2.jpg', 'sandeep@gmail.com', NULL, '0000-00-00', '0000-00-00', '12:13:14.0'),
(8, '3', 'damage', 'pipe', 'break', 'BeWebDeveloper.png', 'sandeep@gmail.com', NULL, '0000-00-00', '0000-00-00', '12:13:14.0'),
(9, '8', 'lung', 'pain', 'incssss', 'avatar.png', 'sandeep@gmail.com', NULL, '0000-00-00', '0000-00-00', '12:13:14.0'),
(10, '4', 'bulb', 'repair', 'glow', 'photo1.png', 'sandeep@gmail.com', NULL, '0000-00-00', '0000-00-00', '12:13:14.0'),
(11, '11', 'subcategory3', 'dekhlebhai', 'testing karle', 'img2.jpg', 'sandeep@gmail.com', NULL, '0000-00-00', '0000-00-00', '12:13:14.0'),
(12, '8', 'lung', 'pain', 'inc\r\n', 'Screenshot (2).png', 'sandeep@gmail.com', NULL, '0000-00-00', '0000-00-00', '12:13:14.0'),
(13, '3', 'damage', 'pipe', 'break', 'photo2.png', 'sandeep@gmail.com', NULL, '0000-00-00', '0000-00-00', '12:13:14.0'),
(14, '4', 'fan', 'slow', 'not working', 'photo4.jpg', 'sandeep@gmail.com', NULL, '0000-00-00', '0000-00-00', '12:13:14.0'),
(15, '7', 'construction', 'building', 'repairing', 'logo.jpg', 'sandeep@gmail.com', NULL, '0000-00-00', '0000-00-00', '12:13:14.0'),
(16, '9', 'subcatgory1', 'design', 'material', 'bg2.jpg', 'sandeep@gmail.com', NULL, '0000-00-00', '0000-00-00', '12:13:14.0'),
(17, '4', 'fan', '', '', 'Screenshot (32).png', 'vickysodhi15@gmail.com', NULL, '0000-00-00', '0000-00-00', '12:13:14.0'),
(19, '8', 'heart', 'heart', 'heart', 'def.jpg', 'sandeep@gmail.com', NULL, '2016-03-29', '2016-03-29', '19:00:00.0'),
(20, '8', 'heart', 'heart', 'heart', 'def.jpg', 'sandeep@gmail.com', NULL, '2016-03-29', '2016-03-29', '15:00:00.0'),
(21, '8', 'heart', 'heart', 'heart', 'def.jpg', 'sandeep@gmail.com', NULL, '2016-03-29', '2016-03-29', '10:00:00.0'),
(22, '8', 'heart', 'heart', 'heart', 'def.jpg', 'sandeep@gmail.com', NULL, '2016-03-29', '2016-03-29', '21:00:00.0'),
(24, '1', 'wall', 'wall', 'wall', 'def.jpg', 'sandeep@gmail.com', NULL, '2016-03-30', '2016-03-24', '19:00:00.0'),
(25, '6', 'wall', 'wall', 'wall', 'def.jpg', 'sandeep@gmail.com', NULL, '2016-03-30', '2016-03-22', '19:00:00.0'),
(26, '6', 'wall', 'wall', 'wall', 'def.jpg', 'sandeep@gmail.com', NULL, '2016-03-30', '2016-03-17', '13:00:00.0'),
(31, '3', 'damage', 'terwy', 'deyhyvcwgyu', 'img1.jpg', 'sandeep@gmail.com', 231, '2016-03-31', '0000-00-00', '10:00:00.0'),
(32, '7', 'construction', 'er4r', 'frfr', 'avatar04.png', 'sandeep@gmail.com', 3213, '2016-03-31', '0000-00-00', '10:00:00.0'),
(33, '1', '', '', 'dede', 'bg2.jpg', 'sandeep@gmail.com', 3232, '2016-03-31', '2103-01-10', '10:00:00.0'),
(54, '3', 'damage', 'dg', 'dgety', 'img2.jpg', 'sandeep@gmail.com', 3231, '2016-03-31', '2016-11-03', '10:00:00.0'),
(57, '11', 'subcategory3', 'dekhlena', 'abtesting', 'bg2.jpg', 'sandeep@gmail.com', 212, '2016-03-31', '2016-11-03', '10:00:00.0'),
(58, '3', 'damage', 'test', 'etet', 'bg2.jpg', 'sandeep@gmail.com', 2323, '2016-03-31', '2016-09-03', '10:00:00.0'),
(64, '4', 'bulb', 'ff', 'gg', 'bg2.jpg', 'sandeep@gmail.com', 21, '2016-04-04', '0000-00-00', '17:00:00.0'),
(70, '6', 'wall', 'wall', 'wall', 'def.jpg', 'sandeep@gmail.com', NULL, '2016-04-04', '2016-04-05', '13:00:00.0'),
(71, '4', 'bulb', 'de', 'fr', 'avatar2.png', 'sandeep@gmail.com', 12, '2016-04-04', '2016-09-04', '10:00:00.0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `createjob`
--
ALTER TABLE `createjob`
  ADD PRIMARY KEY (`subcat_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `createjob`
--
ALTER TABLE `createjob`
  MODIFY `subcat_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=72;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
