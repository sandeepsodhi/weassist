-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2016 at 10:16 AM
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `agent`(IN `fname` VARCHAR(30), IN `lname` VARCHAR(30), IN `uname` VARCHAR(30), IN `pass` VARCHAR(30), IN `utype` VARCHAR(30), IN `rcode` VARCHAR(30), IN `ruser` VARCHAR(30))
INSERT INTO users(f_name,l_name,u_name,pswd,u_type,r_code,r_user)  VALUES(fname,lname,uname,pass,utype,rcode,ruser)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insdata`(IN `uname` VARCHAR(50), IN `fname` VARCHAR(50), IN `lname` VARCHAR(50), IN `pswdd` VARCHAR(50), IN `contactt` INT(50))
INSERT INTO users(u_name,f_name,l_name,pswd,contact) VALUES (uname,fname,lname,pswdd,contactt)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login`(IN `uname` VARCHAR(50), IN `pswdd` VARCHAR(50))
select u_name from users where u_name = uname AND pswd = pswdd$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ruser`(IN `u_namee` VARCHAR(50), IN `pswdd` VARCHAR(50))
select r_code from users where u_name=u_namee AND pswd=pswdd$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `social_login`(IN `fname` VARCHAR(50), IN `lname` VARCHAR(50), IN `uname` VARCHAR(50))
insert into users(f_name,l_name,u_name) values(fname,lname,uname)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `worker`(IN `fname` VARCHAR(30), IN `lname` VARCHAR(30), IN `uname` VARCHAR(30), IN `pass` VARCHAR(30), IN `contact` VARCHAR(30), IN `utype` VARCHAR(30), IN `image` VARCHAR(255), IN `rcode` VARCHAR(255), IN `ruser` VARCHAR(50))
INSERT INTO users(f_name,l_name,u_name,pswd,contact,u_type,image_upload,r_code,r_user)VALUE(fname,lname,uname,pass,contact,utype,image,rcode,ruser)$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `cat_id` int(20) NOT NULL,
  `cat_name` varchar(50) NOT NULL,
  `cat_desc` text,
  `cat_image` varchar(255) NOT NULL DEFAULT 'NewCandidateImage.jpg',
  `cat_isactive` varchar(10) NOT NULL DEFAULT 'YES'
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`cat_id`, `cat_name`, `cat_desc`, `cat_image`, `cat_isactive`) VALUES
(1, 'doctor', 'yu', '3dskylinemodelbyekletti1ez.jpg', 'YES'),
(2, 'doctor', 'hkhkhkhkj', '3d95ecq4.jpg', 'YES'),
(3, 'plumber', 'testing for new catgory', '3d95ecq4.jpg', 'YES'),
(4, 'testin', 'again', '3f03eb0b5712cd94d2750175bd2c432c.jpg', 'YES'),
(5, 'one more time', 'last time', '3d108hha8.jpg', 'YES'),
(6, 'doc', 'docter ', '4em0.jpg', 'YES'),
(7, 'doct', 'yes', '3d101vog3.jpg', 'YES'),
(8, 'doctor', 'yu', '4_Flower12.jpg', 'YES');

-- --------------------------------------------------------

--
-- Table structure for table `sub_categoty`
--

CREATE TABLE IF NOT EXISTS `sub_categoty` (
  `subcat_id` int(10) NOT NULL,
  `cat_id` int(10) NOT NULL,
  `subcat_name` varchar(50) NOT NULL,
  `subcat_desc` text NOT NULL,
  `subcat_image` varchar(255) NOT NULL,
  `subcat_city` varchar(255) NOT NULL,
  `subcat_isactive` varchar(10) NOT NULL DEFAULT 'YES'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `u_id` int(10) NOT NULL,
  `u_type` varchar(50) DEFAULT 'Customer',
  `r_code` varchar(200) NOT NULL,
  `r_user` varchar(40) NOT NULL,
  `u_name` varchar(30) NOT NULL,
  `pswd` varchar(50) NOT NULL,
  `profile_pic` varchar(255) NOT NULL DEFAULT 'image/NewCandidateImage.jpg',
  `f_name` varchar(50) NOT NULL,
  `l_name` varchar(50) NOT NULL,
  `contact` bigint(11) NOT NULL,
  `image_upload` varchar(100) NOT NULL,
  `city` varchar(255) NOT NULL,
  `is_active` varchar(10) NOT NULL DEFAULT 'YES',
  `entry_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `activation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `u_type`, `r_code`, `r_user`, `u_name`, `pswd`, `profile_pic`, `f_name`, `l_name`, `contact`, `image_upload`, `city`, `is_active`, `entry_date`, `activation_date`) VALUES
(1, 'agent', '8LZ8dug6', 'NULL', 'sumanjeet46@gmail.com', 'hudgyuh', 'image/NewCandidateImage.jpg', 'suman', 'jeet', 0, '', '', 'YES', '2016-02-09 05:35:15', '2016-02-09 05:35:15'),
(2, 'customer', 'NULL', 'NULL', 'jj@hjfjfjjk', 'jatin', 'image/NewCandidateImage.jpg', 'jatin', 'roy', 0, '', '', 'YES', '2016-02-09 06:27:40', '2016-02-09 06:27:40'),
(3, 'worker', 'NULL', 'ggg', 'sukhneet@yahoo.com', 'sukh', 'image/NewCandidateImage.jpg', 'sukj', 'sjksj', 0, '', '', 'YES', '2016-02-09 06:28:37', '2016-02-09 06:28:37'),
(4, 'worker', 'NULL', 'NULL', 'kjshj@hjdxhj', 'hjcxhj', 'image/NewCandidateImage.jpg', 'sukh', 'hjksjkjhsw', 0, 'IMG-20151226-WA0011.jpg', '', 'YES', '2016-02-09 06:30:45', '2016-02-09 06:30:45'),
(5, 'worker', 'NULL', '8LZ8dug6', 'edwffdwqfd@fsdddd', 'jhfj', 'image/NewCandidateImage.jpg', 'hdshjdj', 'hjsdjdcjh', 0, 'IMG-20151226-WA0011.jpg', '', 'YES', '2016-02-09 06:35:06', '2016-02-09 06:35:06');

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
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `sub_categoty`
--
ALTER TABLE `sub_categoty`
  ADD PRIMARY KEY (`subcat_id`);

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
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `cat_id` int(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `sub_categoty`
--
ALTER TABLE `sub_categoty`
  MODIFY `subcat_id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
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
