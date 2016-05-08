-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2016 at 10:36 PM
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `edit_profile`(IN `f_name` VARCHAR(255), IN `l_name` VARCHAR(255), IN `profile_pic` VARCHAR(255), IN `city` VARCHAR(255), IN `u_name` VARCHAR(255), IN `contact` INT(255))
    NO SQL
update users SET f_name=f_name,l_name=l_name,profile_pic=profile_pic,city=city,u_name=u_name,contact=contact where u_name=u_name$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insdata`(IN `uname` VARCHAR(50), IN `fname` VARCHAR(50), IN `lname` VARCHAR(50), IN `pswdd` VARCHAR(50), IN `utype` VARCHAR(50))
INSERT INTO users(u_name,f_name,l_name,pswd,u_type) VALUES (uname,fname,lname,pswdd,utype)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertjob`(IN `jobcateg` VARCHAR(50), IN `subcateg` VARCHAR(50), IN `jobtitles` VARCHAR(100), IN `jobdesc` VARCHAR(255), IN `jobphoto` VARCHAR(120), IN `u_name` VARCHAR(50))
    NO SQL
INSERT into createjob (jobcategory,subcategory,jobtitle,jobdesc,photo,uname)
VALUES(jobcateg,subcateg,jobtitles,jobdesc,jobphoto,u_name)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertjobs`(IN `jobcateg` VARCHAR(50), IN `subcateg` VARCHAR(50), IN `jobtitles` VARCHAR(100), IN `jobdesc` VARCHAR(255), IN `u_name` VARCHAR(50))
    NO SQL
INSERT into createjob (jobcategory,subcategory,jobtitle,jobdesc,uname)
VALUES(jobcateg,subcateg,jobtitles,jobdesc,u_name)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login`(IN `uname` VARCHAR(50), IN `pswdd` VARCHAR(50))
select u_id,f_name,l_name,u_name,contact,city,profile_pic from users where u_name = uname AND pswd = pswdd$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login_admin`(IN `u_namee` VARCHAR(20), IN `pswdd` VARCHAR(255))
    NO SQL
SELECT u_id from admin  where u_name = u_namee and pswd=pswdd$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `profession`(IN `u_id` INT(30), IN `cat_id` INT(30), IN `subcat_id` INT(30), IN `u_name` VARCHAR(30))
insert into profession(u_id,cat_id,subcat_id,u_name)

values(u_id,cat_id,subcat_id,u_name)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ruser`(IN `u_namee` VARCHAR(50), IN `pswdd` VARCHAR(50))
select r_code from users where u_name=u_namee AND pswd=pswdd$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `search`(IN `category` VARCHAR(255), IN `sub_category` VARCHAR(255), IN `city` VARCHAR(255))
insert into search (category,sub_category,city)values(category,sub_category,city)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `social_login`(IN `fname` VARCHAR(50), IN `lname` VARCHAR(50), IN `uname` VARCHAR(50))
insert into users(f_name,l_name,u_name) values(fname,lname,uname)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updatedetail`(IN `fname` VARCHAR(50), IN `lname` VARCHAR(50), IN `email` VARCHAR(50), IN `phone` BIGINT(50), IN `citys` VARCHAR(50), IN `uname` VARCHAR(50), IN `pic` VARCHAR(100), IN `states` VARCHAR(50), IN `countrys` VARCHAR(50))
    NO SQL
UPDATE users SET f_name=fname,l_name=lname,uname=email,contact=phone,city=citys, state=states,country=countrys,profile_pic=pic where u_name=uname$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updatedetails`(IN `fname` VARCHAR(50), IN `lname` VARCHAR(50), IN `email` VARCHAR(50), IN `phone` BIGINT(50), IN `city` VARCHAR(50), IN `uname` VARCHAR(50), IN `state` VARCHAR(50), IN `country` VARCHAR(50))
    NO SQL
UPDATE users SET f_name=fname,l_name=lname,uname=email,contact=phone,city=city,
state=state,country=country where u_name=uname$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `worker`(IN `fname` VARCHAR(30), IN `lname` VARCHAR(30), IN `uname` VARCHAR(30), IN `pass` VARCHAR(30), IN `contact` VARCHAR(30), IN `utype` VARCHAR(30), IN `image` VARCHAR(255), IN `rcode` VARCHAR(255), IN `ruser` VARCHAR(50))
INSERT INTO users(f_name,l_name,u_name,pswd,contact,u_type,image_upload,r_code,r_user)VALUE(fname,lname,uname,pass,contact,utype,image,rcode,ruser)$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE IF NOT EXISTS `admin` (
  `u_id` int(20) NOT NULL,
  `u_name` varchar(20) DEFAULT NULL,
  `pswd` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`u_id`, `u_name`, `pswd`) VALUES
(1, 'admin', 'sodhi');

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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`cat_id`, `cat_name`, `cat_desc`, `cat_image`, `cat_isactive`) VALUES
(2, 'painter', 'hkhkhkhkj', 'photo1.png', 'YES'),
(3, 'plumber', 'testing for new catgory', 'photo1.png', 'YES'),
(4, 'Electrician', 'again', 'photo1.png', 'YES'),
(6, 'carpenter', 'docter ', 'photo1.png', 'YES'),
(7, 'worker', 'yes', 'photo1.png', 'YES'),
(8, 'doctor', 'yu', 'photo1.png', 'YES'),
(9, 'designer ', 'building', 'photo1.png', 'YES');

-- --------------------------------------------------------

--
-- Table structure for table `chat_user`
--

CREATE TABLE IF NOT EXISTS `chat_user` (
  `chat_id` int(10) NOT NULL,
  `pr_id` int(10) NOT NULL,
  `channel` varchar(255) NOT NULL,
  `is_online` varchar(20) NOT NULL DEFAULT 'offline'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chat_user`
--

INSERT INTO `chat_user` (`chat_id`, `pr_id`, `channel`, `is_online`) VALUES
(1, 42, 'id_9', 'offline'),
(2, 43, 'id_11', 'offline'),
(3, 3, 'id_11', 'offline');

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
  `job_date` date NOT NULL,
  `target_date` date NOT NULL,
  `job_time` time(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `createjob`
--

INSERT INTO `createjob` (`subcat_id`, `jobcategory`, `subcategory`, `jobtitle`, `jobdesc`, `photo`, `uname`, `job_date`, `target_date`, `job_time`) VALUES
(2, '6', 'roof', 'Repair', 'Repair wall', 'logo.jpg', 'sandeep@gmail.com', '0000-00-00', '0000-00-00', '12:13:14.0'),
(3, '2', 'house', 'TO paint', 'Painting is LIfe', 'avatar5.png', 'sandeep@gmail.com', '0000-00-00', '0000-00-00', '12:13:14.0'),
(4, '7', 'construction', 'construct', 'break', 'photo4.jpg', 'sodhi@mailinator.com', '0000-00-00', '0000-00-00', '12:13:14.0'),
(6, '7', 'construction', 'Break', 'wall', 'avatar04.png', 'sandeep@gmail.com', '0000-00-00', '0000-00-00', '12:13:14.0'),
(8, '3', 'damage', 'pipe', 'break', 'BeWebDeveloper.png', 'sandeep@gmail.com', '0000-00-00', '0000-00-00', '12:13:14.0'),
(9, '8', 'lung', 'pain', 'incssss', 'avatar.png', 'sandeep@gmail.com', '0000-00-00', '0000-00-00', '12:13:14.0'),
(10, '4', 'bulb', 'repair', 'glow', 'photo1.png', 'sandeep@gmail.com', '0000-00-00', '0000-00-00', '12:13:14.0'),
(11, '8', 'lung', 'pain', 'increasing', 'photo4.jpg', 'sandeep@gmail.com', '0000-00-00', '0000-00-00', '12:13:14.0'),
(12, '8', 'lung', 'pain', 'inc\r\n', 'Screenshot (2).png', 'sandeep@gmail.com', '0000-00-00', '0000-00-00', '12:13:14.0'),
(13, '3', 'damage', 'pipe', 'break', 'photo2.png', 'sandeep@gmail.com', '0000-00-00', '0000-00-00', '12:13:14.0'),
(14, '4', 'fan', 'slow', 'not working', 'photo4.jpg', 'sandeep@gmail.com', '0000-00-00', '0000-00-00', '12:13:14.0'),
(15, '7', 'construction', 'building', 'repairing', 'logo.jpg', 'sandeep@gmail.com', '0000-00-00', '0000-00-00', '12:13:14.0'),
(16, '9', 'subcatgory1', 'design', 'material', 'bg2.jpg', 'sandeep@gmail.com', '0000-00-00', '0000-00-00', '12:13:14.0'),
(17, '4', 'fan', '', '', 'Screenshot (32).png', 'vickysodhi15@gmail.com', '0000-00-00', '0000-00-00', '12:13:14.0'),
(19, '8', 'heart', 'heart', 'heart', 'def.jpg', 'sandeep@gmail.com', '2016-03-29', '2016-03-29', '19:00:00.0'),
(20, '8', 'heart', 'heart', 'heart', 'def.jpg', 'sandeep@gmail.com', '2016-03-29', '2016-03-29', '15:00:00.0'),
(21, '8', 'heart', 'heart', 'heart', 'def.jpg', 'sandeep@gmail.com', '2016-03-29', '2016-03-29', '10:00:00.0'),
(22, '8', 'heart', 'heart', 'heart', 'def.jpg', 'sandeep@gmail.com', '2016-03-29', '2016-03-29', '21:00:00.0');

-- --------------------------------------------------------

--
-- Table structure for table `profession`
--

CREATE TABLE IF NOT EXISTS `profession` (
  `pr_id` int(30) NOT NULL,
  `u_id` int(30) NOT NULL,
  `cat_id` int(10) NOT NULL,
  `subcat_id` int(10) NOT NULL,
  `u_name` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profession`
--

INSERT INTO `profession` (`pr_id`, `u_id`, `cat_id`, `subcat_id`, `u_name`) VALUES
(0, 2, 8, 1, 'sandeep@gmail.com'),
(2, 5, 6, 3, 'sodhi@mailinator.com'),
(3, 22, 8, 1, 'sandeeppp@gmail.com');

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sub_category`
--

INSERT INTO `sub_category` (`subcat_id`, `cat_id`, `subcat_name`, `subcat_desc`, `subcat_image`, `subcat_city`, `subcat_isactive`) VALUES
(1, 8, 'heart', 'Important', 'photo4.jpg', 'juc', 'YES'),
(2, 9, 'subcatgory1', 'description for subcategory over here', 'photo4.jpg', 'Ludhiana', 'YES'),
(3, 6, 'wall', 'Damage', 'photo4.jpg', 'jrc', 'YES'),
(4, 6, 'roof', 'crack', 'photo4.jpg', 'jrc', 'YES'),
(5, 4, 'bulb', 'glow', 'photo4.jpg', 'jrc', 'YES'),
(6, 11, 'subcategory3', 'Subcategory description', 'photo4.jpg', 'Jalandhar', 'YES'),
(7, 3, 'damage', 'hhh', 'photo4.jpg', 'jrc', 'YES'),
(8, 2, 'house', 'repair', 'photo4.jpg', 'jrc', 'YES'),
(9, 7, 'construction', 'build', 'photo4.jpg', 'jrc', 'YES'),
(10, 4, 'fan', 'speed', 'photo4.jpg', 'jrc', 'YES');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `u_id` int(10) NOT NULL,
  `u_type` varchar(50) NOT NULL,
  `r_code` varchar(200) NOT NULL,
  `r_user` varchar(40) NOT NULL,
  `u_name` varchar(255) NOT NULL,
  `pswd` varchar(50) NOT NULL,
  `profile_pic` varchar(255) NOT NULL DEFAULT 'NewCandidateImage.jpg',
  `f_name` varchar(50) NOT NULL,
  `l_name` varchar(50) NOT NULL,
  `contact` bigint(11) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `is_active` varchar(10) NOT NULL DEFAULT 'YES',
  `entry_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `activation_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `u_type`, `r_code`, `r_user`, `u_name`, `pswd`, `profile_pic`, `f_name`, `l_name`, `contact`, `city`, `state`, `country`, `is_active`, `entry_date`, `activation_date`) VALUES
(2, 'Customer 	', '8LZ8dug6', 'NULL', 'sandeep@gmail.com', 'sodhi', 'img1.jpg', 'sandeep', 'sodhi', 9287536780, 'Kapurthala', ' Himachal Pradesh', ' India', 'YES', '2016-03-17 21:36:49', '2016-01-27 06:30:50'),
(5, 'Customer 	', '8LZ8dug7', '8LZ8dug6', 'sodhi@mailinator.com', 'sodhi', 'avatar04.png', 'sodhi', 'sandeep', 325023, 'Delhi', '', '', 'YES', '2016-03-17 21:36:52', '2016-01-27 09:40:49'),
(14, 'agent', '8LZ8dug9', '8LZ8dug6', 'infotechtraining1761@gmail.com', '', 'avatar04.png', 'Infotech', 'Training', 0, '', '', '', 'YES', '2016-03-17 21:36:59', '2016-01-27 14:19:03'),
(18, 'agent', '8LZ8dug8', 'NULL', 'vickysodhi15@gmail.com', 'sodhi', 'avatar04.png', 'Sandeep', 'Sodhi', 0, '', '', '', 'YES', '2016-03-17 21:37:05', '2016-01-27 16:07:30'),
(20, 'worker', '8LZ8dug60', '8LZ8dug6', 'infotechtraining2016@gmail.com', '', 'avatar04.png', 'Infotech', 'Singh', 0, '', '', '', 'YES', '2016-03-17 21:37:10', '2016-01-28 04:35:44'),
(22, 'worker', '8LZ8dug1', 'NULL', 'sandeeppp@gmail.com', 'ssss', 'avatar04.png', 'shy', 'sude', 0, 'jallandhar', '', '', 'YES', '2016-03-17 21:37:15', '2016-02-26 23:43:35'),
(23, '', '', '', 'shuvamjha@gmail.com', 'shuvam', 'image/NewCandidateImage.jpg', 'shuvam', 'jha', 0, '', '', '', 'YES', '2016-03-18 16:29:48', '2016-03-18 16:29:48'),
(32, 'agent', '', '', 'sssandeep@gmail.com', 'sodhi', 'NewCandidateImage.jpg', 'Shivam', 'jha', 0, '', '', '', 'YES', '2016-03-25 19:10:54', NULL);

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
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`u_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `chat_user`
--
ALTER TABLE `chat_user`
  ADD PRIMARY KEY (`chat_id`);

--
-- Indexes for table `createjob`
--
ALTER TABLE `createjob`
  ADD PRIMARY KEY (`subcat_id`);

--
-- Indexes for table `profession`
--
ALTER TABLE `profession`
  ADD PRIMARY KEY (`pr_id`);

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
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `u_id` int(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `cat_id` int(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `createjob`
--
ALTER TABLE `createjob`
  MODIFY `subcat_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `profession`
--
ALTER TABLE `profession`
  MODIFY `pr_id` int(30) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `search`
--
ALTER TABLE `search`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=116;
--
-- AUTO_INCREMENT for table `sub_category`
--
ALTER TABLE `sub_category`
  MODIFY `subcat_id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=33;
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
