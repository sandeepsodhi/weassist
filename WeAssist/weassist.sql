-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 23, 2016 at 06:12 PM
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `profession`(IN `uid` VARCHAR(200), IN `fname` VARCHAR(200), IN `lname` VARCHAR(200), IN `email` VARCHAR(200), IN `catname` VARCHAR(200), IN `subcatname` VARCHAR(200), IN `contact` VARCHAR(200), IN `city` VARCHAR(200), IN `image` VARCHAR(200))
insert into profession(u_id,f_name,l_name,email,cat_name,subcat_name,contact,city,image)
values(uid,fname,lname,email,catname,subcatname,contact,city,image)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ruser`(IN `u_namee` VARCHAR(50), IN `pswdd` VARCHAR(50))
select r_code from users where u_name=u_namee AND pswd=pswdd$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `search`(IN `category` VARCHAR(255), IN `sub_category` VARCHAR(255), IN `city` VARCHAR(255))
insert into search (category,sub_category,city)values(category,sub_category,city)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `social_login`(IN `fname` VARCHAR(50), IN `lname` VARCHAR(50), IN `uname` VARCHAR(50))
insert into users(f_name,l_name,u_name) values(fname,lname,uname)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `worker`(IN `fname` VARCHAR(255), IN `lname` VARCHAR(255), IN `uname` VARCHAR(255), IN `pass` VARCHAR(100), IN `utype` VARCHAR(255), IN `rcode` VARCHAR(100), IN `ruser` VARCHAR(200))
INSERT INTO users(f_name,l_name,u_name,pswd,u_type,r_code,r_user)VALUE(fname,lname,uname,pass,utype,rcode,ruser)$$

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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`cat_id`, `cat_name`, `cat_desc`, `cat_image`, `cat_isactive`) VALUES
(9, 'suman', 'jkkjsajxkjk', 'Lighthouse.jpg', 'YES'),
(10, 'jatin', 'kjnkdsnkcn', 'impact-of-media-on-education-3-638.jpg', 'YES'),
(11, 'sukh', 'bsjbxhilzhj', 'impact-of-media-on-education-4-638.jpg', 'YES'),
(12, 'doctor', 'jbxsjbx ', 'impact-of-media-on-education-15-638.jpg', 'YES'),
(13, 'sunny', 'jbhshakhbk', 'impact-of-media-on-education-18-638.jpg', 'YES'),
(14, 'Doctor', 'hjbdskzbcxkjsbxcm ', 'impact-of-media-on-education-21-638.jpg', 'YES'),
(15, 'health', 'ghhisdhaih', 'Desert.jpg', 'YES'),
(16, 'plumber', 'pppppppppp', 'Penguins.jpg', 'YES'),
(17, 'sumanjeet', 'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj', 'IMG-20151227-WA0023.jpg', 'YES'),
(18, 'ssssssss', 'ssssssssssssssssssssssss', '20150403_190739.jpg', 'YES');

-- --------------------------------------------------------

--
-- Table structure for table `profession`
--

CREATE TABLE IF NOT EXISTS `profession` (
  `id` int(30) NOT NULL,
  `u_id` int(30) NOT NULL,
  `f_name` varchar(255) NOT NULL,
  `l_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `cat_name` varchar(255) NOT NULL,
  `subcat_name` varchar(255) NOT NULL,
  `contact` int(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profession`
--

INSERT INTO `profession` (`id`, `u_id`, `f_name`, `l_name`, `email`, `cat_name`, `subcat_name`, `contact`, `city`, `image`) VALUES
(20, 1, '', '', '', 'health', 'doctor', 1111111111, 'jalandhar', 'Chrysanthemum.jpg'),
(21, 2, '', '', '', 'construction', 'contractor', 222222222, 'phillaur', 'Desert.jpg'),
(22, 3, '', '', '', 'health', 'doctor', 2147483647, 'jalandhar', 'Hydrangeas.jpg'),
(23, 5, '', '', '', 'health', 'doctor', 2147483647, 'jalandhar', 'Penguins.jpg'),
(24, 6, '', '', '', 'construction', 'contractor', 2147483647, 'phillaur', 'Desert.jpg'),
(25, 2, '', '', '', 'construction', 'contractor', 2147483647, 'phillaur', 'Koala.jpg'),
(26, 4, '', '', '', 'construction', 'contractor', 2147483647, 'phillaur', '3-Celebrity-Patiala-Salwar-Fashion-of-Kareena-Kapoor-2013-14-4.jpg'),
(27, 5, '', '', '', 'construction', 'contractor', 2147483647, 'phillaur', 'Lighthouse.jpg'),
(29, 5, '', '', '', 'health', 'plumber', 777777, 'Jalandhar, Punjab, India', '51.jpg'),
(33, 5, '', '', '', 'health', 'doctor', 254, 'Jalaldiwal, Punjab, India', '51.jpg'),
(34, 5, '', '', '', 'health', 'doctor', 1324, 'Lucknow, Uttar Pradesh, India', 'Jellyfish.jpg'),
(35, 5, '', '', '', 'construction', 'plumber', 1324, 'Jalaldiwal, Punjab, India', '51.jpg'),
(36, 5, '', '', '', 'construction', 'plumber', 1324, 'Jalaldiwal, Punjab, India', '51.jpg'),
(37, 5, '', '', '', 'health', 'doctor', 12344, 'p', 'impact-of-media-on-education-9-638.jpg'),
(38, 5, '', '', '', 'health', 'doctor', 12344, 'p', 'impact-of-media-on-education-9-638.jpg'),
(39, 5, '', '', '', 'health', 'doctor', 13243, 'Karnal, Haryana, India', '51.jpg'),
(40, 2, '', '', '', 'security', 'electrician', 77777777, 'Karnal, Haryana, India', '3-Celebrity-Patiala-Salwar-Fashion-of-Kareena-Kapoor-2013-14-4.jpg'),
(67, 5, 'kamal', 'jeet', 'kamaljeet@gmail.com', 'construction', 'cleaner', 2147483647, 'Jalandhar, Punjab, India', '20151107_152443.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `search`
--

CREATE TABLE IF NOT EXISTS `search` (
  `id` int(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `sub_category` varchar(100) NOT NULL,
  `city` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `search`
--

INSERT INTO `search` (`id`, `category`, `sub_category`, `city`) VALUES
(84, 'security', 'locksmith', 'jalandhar'),
(85, 'security', 'electrician', 'phillaur'),
(86, 'design', 'design', 'patiala'),
(87, 'design', 'painter', 'amritsar'),
(88, 'health', 'doctor', 'jalandhar'),
(89, 'construction', 'contractor', 'phillaur'),
(90, 'health', 'doctor', 'jalandhar'),
(91, 'health', 'doctor', 'jalandhar'),
(92, 'health', 'doctor', 'jalandhar'),
(93, 'construction', 'contractor', 'phillaur'),
(94, 'construction', 'contractor', 'phillaur'),
(95, 'construction', 'contractor', 'phillaur'),
(96, 'construction', 'contractor', 'phillaur'),
(97, 'construction', 'contractor', 'jalandhar'),
(98, 'construction', 'contractor', 'phillaur'),
(99, 'construction', 'contractor', 'phillaur'),
(100, 'construction', 'contractor', 'phillaur'),
(101, 'health', 'plumber', 'Jalandhar, Punjab, India'),
(102, 'security', 'electrician', 'Karnal, Haryana, India'),
(103, 'construction', 'contractor', 'Jalandhar, Punjab, India'),
(104, 'health', 'doctor', 'phillaur'),
(105, 'health', 'doctor', 'jalandhar'),
(106, 'health', 'doctor', 'jalandhar'),
(107, 'construction', 'contractor', 'phillaur'),
(108, 'Category', '-', ''),
(109, 'health', 'doctor', 'Jalandhar, Punjab, India'),
(110, 'health', 'doctor', 'jalandhar'),
(111, 'construction', 'contractor', 'phillaur'),
(112, 'construction', 'contractor', 'phillaur'),
(113, 'construction', 'contractor', 'phillaur'),
(114, 'construction', 'contractor', 'phillaur'),
(115, 'construction', 'contractor', 'phillaur');

-- --------------------------------------------------------

--
-- Table structure for table `sub_category`
--

CREATE TABLE IF NOT EXISTS `sub_category` (
  `subcat_id` int(10) NOT NULL,
  `cat_id` int(10) NOT NULL,
  `subcat_name` varchar(50) NOT NULL,
  `subcat_desc` text NOT NULL,
  `subcat_image` varchar(255) NOT NULL,
  `subcat_city` varchar(255) NOT NULL,
  `subcat_isactive` varchar(10) NOT NULL DEFAULT 'YES'
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sub_category`
--

INSERT INTO `sub_category` (`subcat_id`, `cat_id`, `subcat_name`, `subcat_desc`, `subcat_image`, `subcat_city`, `subcat_isactive`) VALUES
(2, 15, 'doctor', 'ttttttttttttttt', 'Chrysanthemum.jpg', 'jalandhar', 'YES'),
(3, 16, 'plumber', 'p222222222', 'Tulips.jpg', 'phgwara', 'YES');

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
  `image` varchar(100) NOT NULL,
  `city` varchar(255) NOT NULL,
  `is_active` varchar(10) NOT NULL DEFAULT 'YES',
  `entry_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `activation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `u_type`, `r_code`, `r_user`, `u_name`, `pswd`, `profile_pic`, `f_name`, `l_name`, `contact`, `image`, `city`, `is_active`, `entry_date`, `activation_date`) VALUES
(1, 'agent', 'MwhMsfzu', 'NULL', 'sumanjeet46@gmail.com', 'suman', 'image/NewCandidateImage.jpg', 'suman', 'jeet', 0, '', '', 'YES', '2016-02-10 05:34:14', '2016-02-10 05:34:14'),
(2, 'worker', 'NULL', '123', 'abc@gmail.com', 'abc', 'image/NewCandidateImage.jpg', 'abc', 'efg', 0, '', '', 'YES', '2016-02-13 15:45:14', '2016-02-13 15:45:14'),
(3, 'worker', 'NULL', 'MwhMsfzu', 'worker1@gmail.com', 'worker1', 'image/NewCandidateImage.jpg', 'worker1', 'w1', 0, '', '', 'YES', '2016-02-13 15:54:59', '2016-02-13 15:54:59'),
(4, 'customer', 'NULL', 'NULL', 'jatinroy@gmail.com', 'jatin', 'image/NewCandidateImage.jpg', 'jatin', 'roy', 0, '', '', 'YES', '2016-02-14 09:32:43', '2016-02-14 09:32:43'),
(5, 'agent', 'aMdL13IO', 'NULL', 'sukhneet@yahoo.com', 'sukhneet', 'image/NewCandidateImage.jpg', 'sukhnet', 'kaur', 0, '', '', 'YES', '2016-02-14 09:33:09', '2016-02-14 09:33:09'),
(6, 'worker', 'NULL', 'suman', 'roop@live.com', 'roop', 'image/NewCandidateImage.jpg', 'roop', 'kaur', 0, '', '', 'YES', '2016-02-14 09:33:34', '2016-02-14 09:33:34'),
(7, 'worker', 'NULL', 'MwhMsfzu', '', '', 'image/NewCandidateImage.jpg', '', '', 0, '', '', 'YES', '2016-02-15 05:48:18', '2016-02-15 05:48:18'),
(8, 'worker', 'NULL', 'MwhMsfzu', 'ap@gmail.com', 'aaa', 'image/NewCandidateImage.jpg', 'aaa', 'aaa', 0, '', '', 'YES', '2016-02-15 05:51:03', '2016-02-15 05:51:03');

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
-- Indexes for table `profession`
--
ALTER TABLE `profession`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `search`
--
ALTER TABLE `search`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_category`
--
ALTER TABLE `sub_category`
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
  MODIFY `cat_id` int(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `profession`
--
ALTER TABLE `profession`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=68;
--
-- AUTO_INCREMENT for table `search`
--
ALTER TABLE `search`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=116;
--
-- AUTO_INCREMENT for table `sub_category`
--
ALTER TABLE `sub_category`
  MODIFY `subcat_id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
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
