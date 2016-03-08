-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 08, 2016 at 06:43 AM
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `agent`(IN `fname` VARCHAR(30), IN `lname` VARCHAR(30), IN `uname` VARCHAR(100), IN `pass` VARCHAR(255), IN `utype` VARCHAR(50), IN `rcode` VARCHAR(30), IN `ruser` VARCHAR(30))
INSERT INTO users(f_name,l_name,u_name,pswd,u_type,r_code,r_user)  VALUES(fname,lname,uname,pass,utype,rcode,ruser)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insdata`(IN `uname` VARCHAR(50), IN `fname` VARCHAR(50), IN `lname` VARCHAR(50), IN `pswdd` VARCHAR(50), IN `contactt` INT(50))
INSERT INTO users(u_name,f_name,l_name,pswd,contact) VALUES (uname,fname,lname,pswdd,contactt)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login`(IN `uname` VARCHAR(50), IN `pswdd` VARCHAR(50))
select f_name from users where u_name = uname AND pswd = pswdd$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `profession`(IN `uid` VARCHAR(200), IN `fname` VARCHAR(200), IN `lname` VARCHAR(200), IN `email` VARCHAR(200), IN `catname` VARCHAR(200), IN `subcatname` VARCHAR(200), IN `contact` VARCHAR(200), IN `city` VARCHAR(200), IN `image` VARCHAR(200))
insert into profession(u_id,f_name,l_name,email,cat_name,subcat_name,contact,city,image)
values(uid,fname,lname,email,catname,subcatname,contact,city,image)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ruser`(IN `u_namee` VARCHAR(50), IN `pswdd` VARCHAR(50))
select r_code from users where u_name=u_namee AND pswd=pswdd$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `search`(IN `category` VARCHAR(255), IN `sub_category` VARCHAR(255), IN `city` VARCHAR(255))
insert into search (category,sub_category,city)values(category,sub_category,city)$$

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`cat_id`, `cat_name`, `cat_desc`, `cat_image`, `cat_isactive`) VALUES
(1, 'doctor', 'yu', '3dskylinemodelbyekletti1ez.jpg', 'YES'),
(3, 'plumber', 'testing for new catgory', '3d95ecq4.jpg', 'YES'),
(4, 'testin', 'again', '3f03eb0b5712cd94d2750175bd2c432c.jpg', 'YES'),
(5, 'one more time', 'last time', '3d108hha8.jpg', 'YES'),
(6, 'doc', 'docter ', '4em0.jpg', 'YES'),
(7, 'doct', 'yes', '3d101vog3.jpg', 'YES'),
(9, 'category 9', 'category 1 description over her', 'abstract6.jpg', 'YES'),
(11, 'category 11', ' test description for the category', '2 (2).jpg', 'YES');

-- --------------------------------------------------------

--
-- Table structure for table `chat_user`
--

CREATE TABLE IF NOT EXISTS `chat_user` (
  `chat_id` int(10) NOT NULL,
  `u_id` int(10) NOT NULL,
  `cat_id` int(10) NOT NULL,
  `subcat_id` int(10) NOT NULL,
  `channel` varchar(255) NOT NULL,
  `is_online` varchar(20) NOT NULL DEFAULT 'offline'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chat_user`
--

INSERT INTO `chat_user` (`chat_id`, `u_id`, `cat_id`, `subcat_id`, `channel`, `is_online`) VALUES
(1, 14, 9, 2, 'id_9', 'online'),
(2, 18, 11, 6, 'id_11', 'online');

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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;

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
(41, 5, 'bhdfkj', 'bkabk', 'bsbj', 'suman', 'jkjs', 0, 'jksk', 'Untitled.png');

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
  `subcat_image` varchar(255) NOT NULL DEFAULT 'NewCandidateImage.jpg',
  `subcat_city` varchar(255) NOT NULL,
  `subcat_isactive` varchar(10) NOT NULL DEFAULT 'YES'
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sub_category`
--

INSERT INTO `sub_category` (`subcat_id`, `cat_id`, `subcat_name`, `subcat_desc`, `subcat_image`, `subcat_city`, `subcat_isactive`) VALUES
(2, 9, 'subcatgory1', 'description for subcategory over here', '3d95ecq4.jpg', 'Ludhiana', 'YES'),
(6, 11, 'subcategory3', 'Subcategory description', '3a507a021798c7fcb7bccf9266e3e01f.jpg', 'Jalandhar', 'YES');

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
  `profile_pic` varchar(255) NOT NULL DEFAULT 'NewCandidateImage.jpg',
  `f_name` varchar(50) NOT NULL,
  `l_name` varchar(50) NOT NULL,
  `contact` bigint(11) NOT NULL,
  `city` varchar(255) NOT NULL,
  `is_active` varchar(10) NOT NULL DEFAULT 'YES',
  `entry_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `activation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `u_type`, `r_code`, `r_user`, `u_name`, `pswd`, `profile_pic`, `f_name`, `l_name`, `contact`, `city`, `is_active`, `entry_date`, `activation_date`) VALUES
(1, 'admnin', '', '', 'admin@admin', '', 'NewCandidateImage.jpg', 'admin', ' ', 0, '', 'YES', '2016-02-25 09:09:47', '2016-01-28 04:35:44'),
(14, 'Customer', '', '', 'infotechtraining1761@gmail.com', '', 'NewCandidateImage.jpg', 'Infotech', 'Training', 0, 'Ludhiana', 'YES', '2016-03-04 05:04:24', '2016-01-27 14:19:03'),
(18, 'Customer', '', '', 'vickysodhi15@gmail.com', '', 'NewCandidateImage.jpg', 'Sandeep', 'Sodhi', 0, 'Jalandhar', 'YES', '2016-03-04 05:04:04', '2016-01-27 16:07:30'),
(21, 'agent', '8LZ8dug6', 'NULL', 'sumanjeet46@gmail.com', 'suman', 'NewCandidateImage.jpg', 'suman', 'jeet', 534678, 'jalandhar', 'YES', '2016-02-13 13:02:20', '2016-02-13 13:02:20'),
(22, 'worker', 'NULL', '8LZ8dug6', 'sukhneet@gmail.com', 'sukh', 'NewCandidateImage.jpg', 'sukh', 'neet', 531234678, 'jalandhar', 'YES', '2016-02-13 13:42:15', '2016-02-13 13:04:58'),
(23, 'worker', 'NULL', '8LZ8dug6', 'abc@abc.com', 'abc', '5o6Jvky.jpg', '123abc', 'def', 1123456, 'jalandhar', 'YES', '2016-02-24 04:42:25', '2016-02-13 13:07:03'),
(24, 'agent', 'oACkoMzv', 'NULL', 'sodhi@sodhi.com', 'sodhi', 'NewCandidateImage.jpg', 'Sandeep ', 'sodhi', 0, '', 'YES', '2016-02-26 10:11:03', '2016-02-26 10:11:03'),
(26, 'worker', 'NULL', 'oACkoMzv', 'sodhi1@sodhi.com', 'sodhi', 'NewCandidateImage.jpg', 'sodhi', 'sandeep', 0, '', 'YES', '2016-02-26 10:13:58', '2016-02-26 10:13:58');

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
  ADD PRIMARY KEY (`cat_id`), ADD UNIQUE KEY `cat_name` (`cat_name`);

--
-- Indexes for table `chat_user`
--
ALTER TABLE `chat_user`
  ADD PRIMARY KEY (`chat_id`);

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
  ADD PRIMARY KEY (`subcat_id`), ADD UNIQUE KEY `subcat_name` (`subcat_name`);

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
  MODIFY `cat_id` int(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `profession`
--
ALTER TABLE `profession`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=42;
--
-- AUTO_INCREMENT for table `search`
--
ALTER TABLE `search`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=116;
--
-- AUTO_INCREMENT for table `sub_category`
--
ALTER TABLE `sub_category`
  MODIFY `subcat_id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=27;
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
