-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 28, 2016 at 12:14 PM
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

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `insdata`(IN `uname` VARCHAR(50), IN `fname` VARCHAR(50), IN `lname` VARCHAR(50), IN `pswdd` VARCHAR(50), IN `contactt` INT(50))
INSERT INTO users(u_name,f_name,l_name,pswd,contact) VALUES (uname,fname,lname,pswdd,contactt)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login`(IN `uname` VARCHAR(50), IN `pswdd` VARCHAR(50))
select f_name from users where u_name = uname AND pswd = pswdd$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `social_login`(IN `fname` VARCHAR(50), IN `lname` VARCHAR(50), IN `uname` VARCHAR(50))
insert into users(f_name,l_name,u_name) values(fname,lname,uname)$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `u_id` int(10) NOT NULL,
  `u_name` varchar(30) NOT NULL,
  `pswd` varchar(50) NOT NULL,
  `profile_pic` varchar(255) NOT NULL DEFAULT 'image/NewCandidateImage.jpg',
  `f_name` varchar(50) NOT NULL,
  `l_name` varchar(50) NOT NULL,
  `contact` bigint(11) NOT NULL,
  `city` varchar(255) NOT NULL,
  `is_active` varchar(10) NOT NULL DEFAULT 'YES',
  `entry_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `activation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `u_name`, `pswd`, `profile_pic`, `f_name`, `l_name`, `contact`, `city`, `is_active`, `entry_date`, `activation_date`) VALUES
(1, 'qwe', 'da', 'image/NewCandidateImage.jpg', 'fs', 'sad', 1313, '', 'YES', '2016-01-27 06:23:13', '2016-01-27 06:23:13'),
(2, 'sandeep@gmail.com', 'sodhi', 'image/NewCandidateImage.jpg', 'singh', 'sodhi', 21214124, '', 'YES', '2016-01-27 06:30:50', '2016-01-27 06:30:50'),
(5, 'sodhi@mailinator.com', 'sodhi', 'image/NewCandidateImage.jpg', 'sodhi', 'sandeep', 325023, '', 'YES', '2016-01-27 09:40:49', '2016-01-27 09:40:49'),
(11, '', '', 'image/NewCandidateImage.jpg', '', '', 0, '', 'YES', '2016-01-27 12:38:00', '2016-01-27 12:38:00'),
(14, 'infotechtraining1761@gmail.com', '', 'image/NewCandidateImage.jpg', 'Infotech', 'Training', 0, '', 'YES', '2016-01-27 14:19:03', '2016-01-27 14:19:03'),
(18, 'vickysodhi15@gmail.com', '', 'image/NewCandidateImage.jpg', 'Sandeep', 'Sodhi', 0, '', 'YES', '2016-01-27 16:07:30', '2016-01-27 16:07:30'),
(20, 'infotechtraining2016@gmail.com', '', 'image/NewCandidateImage.jpg', 'Infotech', 'Singh', 0, '', 'YES', '2016-01-28 04:35:44', '2016-01-28 04:35:44');

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

CREATE TABLE IF NOT EXISTS `user_type` (
  `u_type_id` int(10) NOT NULL,
  `u_type_name` varchar(10) NOT NULL,
  `is_active` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`), ADD UNIQUE KEY `u_name` (`u_name`);

--
-- Indexes for table `user_type`
--
ALTER TABLE `user_type`
  ADD PRIMARY KEY (`u_type_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=28;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_type`
--
ALTER TABLE `user_type`
ADD CONSTRAINT `user_type_ibfk_1` FOREIGN KEY (`u_type_id`) REFERENCES `users` (`u_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
