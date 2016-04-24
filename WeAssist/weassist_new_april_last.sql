-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 25, 2016 at 12:08 AM
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

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertjob`(IN `jobcateg` VARCHAR(50), IN `subcateg` VARCHAR(50), IN `jobtitles` VARCHAR(100), IN `jobdesc` VARCHAR(255), IN `jobphoto` VARCHAR(120), IN `u_name` VARCHAR(50), IN `price` INT(50), IN `jdate` DATE, IN `tdate` DATE, IN `tim` TIME)
    NO SQL
INSERT into createjob (jobcategory,subcategory,jobtitle,jobdesc,photo,uname,job_price,job_date,target_date,job_time)
VALUES(jobcateg,subcateg,jobtitles,jobdesc,jobphoto,u_name,price,jdate,tdate,tim)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertjobs`(IN `jobcateg` VARCHAR(50), IN `subcateg` VARCHAR(50), IN `jobtitles` VARCHAR(100), IN `jobdesc` VARCHAR(255),  IN `u_name` VARCHAR(50), IN `price` INT(50), IN `jdate` DATE, IN `tdate` DATE, IN `tim` TIME)
    NO SQL
INSERT into createjob (jobcategory,subcategory,jobtitle,jobdesc,uname,job_price,job_date,target_date,job_time) VALUES(jobcateg,subcateg,jobtitles,jobdesc,u_name,price,jdate,tdate,tim)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insertstatus`(IN `jobid` INT(10), IN `catid` INT(10), IN `subcatid` INT(10))
    NO SQL
insert into job_status (job_id,cat_id,subcat_id) VALUES(jobid,
                                                      catid,subcatid)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login`(IN `uname` VARCHAR(50), IN `pswdd` VARCHAR(50))
select u_id,f_name,l_name,u_name,contact,city,profile_pic,u_type from users where u_name = uname AND pswd = pswdd$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login_admin`(IN `u_namee` VARCHAR(20), IN `pswdd` VARCHAR(255))
    NO SQL
SELECT u_id from admin  where u_name = u_namee and pswd=pswdd$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `profession`(IN `u_id` INT(30), IN `cat_id` INT(30), IN `subcat_id` INT(30), IN `u_name` VARCHAR(30))
insert into profession(u_id,cat_id,subcat_id,u_name)

values(u_id,cat_id,subcat_id,u_name)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `register`(IN `fname` VARCHAR(30), IN `lname` VARCHAR(30), IN `uname` VARCHAR(100), IN `pass` VARCHAR(255), IN `utype` VARCHAR(50), IN `rcode` VARCHAR(30), IN `ruser` VARCHAR(30), IN `profilepic` VARCHAR(255))
INSERT INTO users(f_name,l_name,u_name,pswd,u_type,r_code,r_user,profile_pic)  VALUES(fname,lname,uname,pass,utype,rcode,ruser,profilepic)$$

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

CREATE DEFINER=`root`@`localhost` PROCEDURE `worker`(IN `fname` VARCHAR(30), IN `lname` VARCHAR(30), IN `uname` VARCHAR(30), IN `pass` VARCHAR(30), IN `utype` VARCHAR(30), IN `image` VARCHAR(255), IN `rcode` VARCHAR(255), IN `ruser` VARCHAR(50))
INSERT INTO users(f_name,l_name,u_name,pswd,u_type,profile_pic,r_code,r_user)VALUE(fname,lname,uname,pass,utype,image,rcode,ruser)$$

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`cat_id`, `cat_name`, `cat_desc`, `cat_image`, `cat_isactive`) VALUES
(1, 'doctor', 'animal doctors', 'doc1.jpg', 'YES'),
(2, 'painter', 'Apply paint to surfaces including canvas, walls', 'paint1.jpg', 'YES'),
(3, 'plumber', 'responsible for installing, repairing and maintaining', 'plum1.jpg', 'YES'),
(4, 'Electrician', 'Assemble, install, test, and maintain electrical or electronic wiring', 'elec1.jpg', 'YES'),
(5, 'Builder', 'Construction ', 'build1.jpg', 'YES'),
(6, 'carpenter', 'Install structures and fixtures, such as windows and molding', 'carp1.jpg', 'YES'),
(7, 'worker', 'construction job', 'work1.jpg', 'YES'),
(8, 'doctor', 'specialize in a number of medical areas', 'doc2.jpg', 'YES'),
(9, 'category 9', 'category 1 description over her', 'unk1.png', 'YES'),
(11, 'category 11', ' test description for the category', 'unk2.png', 'YES');

-- --------------------------------------------------------

--
-- Table structure for table `chat_user`
--

CREATE TABLE IF NOT EXISTS `chat_user` (
  `chat_id` int(10) NOT NULL,
  `pr_id` int(10) NOT NULL,
  `channel` varchar(255) NOT NULL,
  `is_online` varchar(20) NOT NULL DEFAULT 'offline'
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chat_user`
--

INSERT INTO `chat_user` (`chat_id`, `pr_id`, `channel`, `is_online`) VALUES
(1, 42, 'id_9', 'offline'),
(2, 43, 'id_11', 'offline'),
(3, 32, '', 'offline'),
(4, 44, 'agent_34', 'online'),
(5, 118, 'agent_34', 'online'),
(6, 132, 'agent_34', 'online'),
(7, 127, 'agent_34', 'online'),
(8, 3, 'agent_34', 'online');

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
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `createjob`
--

INSERT INTO `createjob` (`subcat_id`, `jobcategory`, `subcategory`, `jobtitle`, `jobdesc`, `photo`, `uname`, `job_price`, `job_date`, `target_date`, `job_time`) VALUES
(31, '3', 'damage', 'pipe', 'break', 'img1.jpg', 'sandeep@gmail.com', 231, '2016-03-31', '0000-00-00', '10:00:00.0'),
(57, '11', 'subcategory3', 'floor crack', 'repair', 'bg2.jpg', 'sandeep@gmail.com', 212, '2016-03-31', '2016-11-03', '10:00:00.0'),
(75, '6', 'wall', 'wall', 'paint the wall', 'wall1.jpg', 'sandeep@gmail.com', 200, '2016-04-06', '2016-04-16', '16:00:00.0'),
(78, '3', 'damage', 'Tap', 'blockage', 'icons.png', 'sandeep@gmail.com', 212, '2016-04-08', '0000-00-00', '10:00:00.0'),
(79, '11', 'subcategory3', 'chair break', 'repair', 'plum3.jpg', 'sandeep@gmail.com', 2121, '2016-04-08', '0000-00-00', '10:00:00.0'),
(80, '6', 'wall', 'crack', 'Repair', 'bg2.jpg', 'sandeep@gmail.com', 121, '2016-04-08', '0000-00-00', '10:00:00.0'),
(81, '8', 'heart', 'pain', 'pain', '', 'sandeep@gmail.com', 12, '2016-04-08', '0000-00-00', '10:00:00.0'),
(83, '9', 'subcatgory1', 'Furniture', 'dedebreak', 'bg2.jpg', 'sandeep@gmail.com', 21, '2016-04-08', '0000-00-00', '10:00:00.0'),
(85, '4', 'bulb', 'Not glow', 'Fix It', 'bulb1.jpg', 'sandeep@gmail.com', 213, '2016-04-08', '2016-04-19', '10:00:00.0'),
(86, '3', 'damage', 'pipe', 'damage', 'work3.jpg', 'sandeep@gmail.com', 2121, '2016-04-09', '2016-04-09', '00:00:00.0'),
(87, '4', 'bulb', 'No power', 'Repair', 'bulb1.jpg', 'sandeep@gmail.com', 212, '2016-04-09', '2016-04-09', '12:00:00.0'),
(88, '6', 'wall', 'damage', 'break', 'wall1.jpg', 'sandeep@gmail.com', 12, '2016-04-09', '2016-04-21', '10:50:00.0'),
(90, '3', 'damage', 'Tap Damage', 'Slow ', 'bg2.jpg', 'sandeep@gmail.com', 213, '2016-04-12', '2016-04-15', '12:00:00.0'),
(91, '3', 'damage', 'flowtesting', 'blockage', 'impact-of-media-on-education-20-638.jpg', 'sandeep@gmail.com', 200, '2016-04-13', '2016-04-15', '14:10:00.0'),
(92, '6', 'wall', 'wall', 'wall', 'def.jpg', 'sandeep@gmail.com', 200, '2016-04-13', '2016-04-28', '19:00:00.0'),
(93, '4', 'bulb', 'Plug', 'Problem', 'BeWebDeveloper.png', 'sandeep@gmail.com', 212, '2016-04-22', '2016-04-28', '11:55:00.0'),
(94, '2', 'house', 'kitchen', 'whole', 'bg2.jpg', 'sandeep@gmail.com', 211, '2016-04-22', '2016-04-30', '12:00:00.0'),
(95, '3', 'damage', 'pipe', 'repair', '4em0.jpg', 'sandeep@gmail.com', 212, '2016-04-22', '2016-04-28', '23:55:00.0'),
(97, '5', 'construction', 'House ', 'damage', 'house1.jpg', 'sandeep@gmail.com', 200, '2016-04-24', '2016-04-27', '11:55:00.0');

-- --------------------------------------------------------

--
-- Table structure for table `job_status`
--

CREATE TABLE IF NOT EXISTS `job_status` (
  `job_id` int(11) NOT NULL,
  `cat_id` int(11) DEFAULT NULL,
  `subcat_id` int(11) DEFAULT NULL,
  `workerassign` varchar(100) DEFAULT NULL,
  `status` int(10) NOT NULL DEFAULT '0',
  `rating` int(10) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `job_status`
--

INSERT INTO `job_status` (`job_id`, `cat_id`, `subcat_id`, `workerassign`, `status`, `rating`) VALUES
(31, 3, 7, 'sumanjeet461@gmail.com', 0, 0),
(57, 11, 6, 'sumanjeet461@gmail.com', 1, 5),
(75, 6, 3, NULL, 0, 0),
(78, 3, 7, 'infotechtraining2016@gmail.com', 1, 5),
(79, 11, 6, 'sumanjeet461@gmail.com', 0, 0),
(80, 6, 3, NULL, 0, 0),
(81, 8, 1, NULL, 0, 0),
(83, 9, 2, NULL, 0, 0),
(85, 4, 5, 'sumanjeet461@gmail.com', 1, 0),
(86, 3, 7, NULL, 0, 0),
(87, 4, 5, NULL, 0, 0),
(88, 6, 3, NULL, 0, 0),
(90, 3, 7, NULL, 0, 0),
(91, 3, 7, 'sumanjeet461@gmail.com', 0, 0),
(92, 6, 3, NULL, 0, 0),
(93, 0, 0, NULL, 0, 0),
(94, 2, 8, NULL, 0, 0),
(95, 3, 7, NULL, 0, 0),
(97, 5, 9, NULL, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `profession`
--

CREATE TABLE IF NOT EXISTS `profession` (
  `pr_id` int(30) NOT NULL,
  `u_id` int(30) NOT NULL,
  `cat_id` int(10) NOT NULL,
  `subcat_id` int(10) NOT NULL,
  `u_name` varchar(255) NOT NULL,
  `rating` int(10) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=133 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profession`
--

INSERT INTO `profession` (`pr_id`, `u_id`, `cat_id`, `subcat_id`, `u_name`, `rating`) VALUES
(0, 2, 8, 1, 'sandeep@gmail.com', 0),
(2, 5, 6, 3, 'sodhi@mailinator.com', 0),
(3, 21, 11, 6, 'sumanjeet461@gmail.com', 0),
(42, 14, 9, 2, 'infotechtraining1761@gmail.com', 0),
(43, 18, 11, 6, 'vickysodhi15@gmail.com', 0),
(44, 34, 3, 7, 'sumanjeet461@gmail.com', 0),
(118, 34, 4, 5, 'sumanjeet461@gmail.com', 0),
(127, 34, 7, 9, 'sumanjeet461@gmail.com', 0),
(132, 34, 4, 10, 'sumanjeet461@gmail.com', 0);

-- --------------------------------------------------------

--
-- Table structure for table `reject_job`
--

CREATE TABLE IF NOT EXISTS `reject_job` (
  `rej_id` int(15) NOT NULL,
  `u_name` varchar(50) NOT NULL,
  `job_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sub_category`
--

INSERT INTO `sub_category` (`subcat_id`, `cat_id`, `subcat_name`, `subcat_desc`, `subcat_image`, `subcat_city`, `subcat_isactive`) VALUES
(1, 8, 'heart', 'Pain', 'heart.jpg', 'Amritsar', 'YES'),
(2, 9, 'subcatgory1', 'description for subcategory over here', 'photo4.jpg', 'Ludhiana', 'YES'),
(3, 6, 'wall', 'Damage', 'wall1.jpg', 'Jalandhar', 'YES'),
(4, 6, 'roof', 'crack', 'roof1.jpg', 'Patiala', 'YES'),
(5, 4, 'bulb', 'fluctuating', 'bulb1.jpg', 'Ferozepur', 'YES'),
(6, 11, 'subcategory3', 'Subcategory description', 'photo4.jpg', 'Jalandhar', 'YES'),
(7, 3, 'damage', 'Floor', 'floor1.jpg', 'Ajitwal', 'YES'),
(8, 2, 'house', 'repair', 'house1.jpg', 'Abohar', 'YES'),
(9, 7, 'construction', 'build', 'cons1.jpg', 'Bathinda', 'YES'),
(10, 4, 'fan', 'speed', 'photo4.jpg', 'Chandigarh', 'YES'),
(11, 5, 'construction', 'Any building construction', 'work2.jpg', 'Chandigarh', 'YES');

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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `u_type`, `r_code`, `r_user`, `u_name`, `pswd`, `profile_pic`, `f_name`, `l_name`, `contact`, `city`, `state`, `country`, `is_active`, `entry_date`, `activation_date`) VALUES
(2, 'customer 	', '8LZ8dug6', 'NULL', 'sande11ep@gmail.com', 'sodhi', 'img1.jpg', 'sandeeeep', 'sodddih', 21212, 'Jalandhar', ' Punjab', ' India', 'YES', '2016-04-12 17:52:40', '2016-01-27 06:30:50'),
(5, 'customer 	', '8LZ8dug7', '8LZ8dug6', 'sodhi@mailinator.com', 'sodhi', 'avatar04.png', 'sodhi', 'sandeep', 325023, 'Delhi', '', '', 'YES', '2016-04-19 02:06:43', '2016-01-27 09:40:49'),
(14, 'customer', '', '', 'infotechtraining176@gmail.com', 'sodhi', 'NewCandidateImage.jpg', 'Infotech', 'Training', 328493850943, 'Ludhiana', '', '', 'YES', '2016-04-19 02:06:49', '2016-01-27 08:49:03'),
(15, 'agent', '8LZ8dug9', '8LZ8dug6', 'infotechtraining1761@gmail.com', '', 'avatar04.png', 'Infotech', 'Training', 0, '', '', '', 'YES', '2016-03-26 07:56:21', '2016-01-27 14:19:03'),
(17, 'agent', '8LZ8dug8', 'NULL', 'vickysodhi155@gmail.com', 'sodhi', 'avatar04.png', 'Sandeep', 'Sodhi', 0, '', '', '', 'YES', '2016-03-26 08:02:20', '2016-01-27 16:07:30'),
(18, 'Customer', 'NULL', 'NULL', 'vickysodhi15@gmail.com', 'sodhi', 'abstract6.jpg', 'Sandeep', 'Sodhi', 0, 'Jalandhar', '', '', 'YES', '2016-04-12 17:41:20', '2016-01-27 10:37:30'),
(20, 'worker', '8LZ8dug60', '8LZ8dug6', 'infotechtraining2016@gmail.com', '', 'avatar04.png', 'Infotech', 'Singh', 0, '', '', '', 'YES', '2016-03-17 21:37:10', '2016-01-28 04:35:44'),
(21, 'agent', '8LZ8dug6', 'NULL', 'sumanjeet46@gmail.com', '2', '4em0.jpg', 'suman', 'jeet', 8798466566, 'Ludhiana', ' Punjab', ' India', 'YES', '2016-04-20 19:23:23', '2016-02-13 07:32:20'),
(22, 'worker', '8LZ8dug1', 'NULL', 'sandeeppp@gmail.com', 'ssss', 'avatar04.png', 'shy', 'sude', 0, 'jallandhar', '', '', 'YES', '2016-03-17 21:37:15', '2016-02-26 23:43:35'),
(23, '', '', '', 'shuvamjha@gmail.com', 'shuvam', 'NewCandidateImage.jpg', 'shuvam', 'jha', 0, '', '', '', 'YES', '2016-03-26 07:46:06', '2016-03-18 16:29:48'),
(24, 'agent', 'oACkoMzv', 'NULL', 'sodhi@sodhi.com', 'sodhi', '3.jpg', 'Sandeep ', 'sodhi', 0, '', '', '', 'YES', '2016-03-24 11:22:57', '2016-02-26 04:41:03'),
(25, 'worker', 'NULL', '8LZ8dug6', 'sukhneet@gmail.com', 'sukh', 'logo.jpg', 'sukh', 'neet', 531234678, 'Ludhiana', '', '', 'YES', '2016-03-26 02:31:32', '2016-02-13 07:34:58'),
(26, 'worker', 'NULL', 'oACkoMzv', 'sodhi1@sodhi.com', 'sodhi', '1.jpg', 'sodhi', 'sandeep', 0, '', '', '', 'YES', '2016-03-24 11:22:18', '2016-02-26 04:43:58'),
(28, 'worker', 'NULL', '8LZ8dug6', 'abc@abc.com', 'abc', '5o6Jvky.jpg', '123abc', 'def', 1123456, 'jalandhar', '', '', 'YES', '2016-03-26 02:31:17', '2016-02-13 07:37:03'),
(32, 'agent', '', '', 'sssandeep@gmail.com', 'sodhi', 'NewCandidateImage.jpg', 'Shivam', 'jha', 0, '', '', '', 'YES', '2016-03-25 19:10:54', NULL),
(33, 'customer', 'NULL', 'NULL', 'sandeep@gmail.com', 'sodhi', 'images.jpg', 'Sandeep', 'Singh', 8475145684, 'Chandigarh', 'NA', ' India', 'YES', '2016-04-22 09:03:38', NULL),
(34, 'worker', 'null', '8LZ8dug6', 'sumanjeet461@gmail.com', 'sodhi', 'avatar5.png', 'suman', 'jeet', 83635267227, 'Chandigarh', '', '', 'YES', '2016-04-22 20:02:31', '2016-04-12 07:00:00'),
(35, 'worker', 'NULL', '', 'qsumanjeet46@gmail.com', '123', 'NewCandidateImage.jpg', 'Sandeep', 'sodhi', 0, '', '', '', 'YES', '2016-04-14 19:29:02', NULL),
(36, 'agent', 'V3RZ4bwQ', 'NULL', 'testing@agent.com', '123', 'NewCandidateImage.jpg', 'testing', 'agent', 0, '', '', '', 'YES', '2016-04-14 19:31:14', NULL),
(37, 'agent', '9QnsSIVi', 'NULL', '1testing@agent.com', '123', 'NewCandidateImage.jpg', 'testing', 'agent', 0, '', '', '', 'YES', '2016-04-14 19:35:09', NULL),
(38, 'worker', 'NULL', '8LZ8dug6', 'shuvam.j@gmail.com', 'SpZayk5U', 'NewCandidateImage.jpg', 'hsiv', 'jah', 0, '', '', '', 'YES', '2016-04-24 22:03:01', NULL);

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
  ADD PRIMARY KEY (`chat_id`), ADD UNIQUE KEY `pr_id` (`pr_id`), ADD UNIQUE KEY `chat_id` (`chat_id`);

--
-- Indexes for table `createjob`
--
ALTER TABLE `createjob`
  ADD PRIMARY KEY (`subcat_id`);

--
-- Indexes for table `job_status`
--
ALTER TABLE `job_status`
  ADD PRIMARY KEY (`job_id`);

--
-- Indexes for table `profession`
--
ALTER TABLE `profession`
  ADD PRIMARY KEY (`pr_id`), ADD UNIQUE KEY `cat_id` (`cat_id`,`subcat_id`,`u_name`);

--
-- Indexes for table `reject_job`
--
ALTER TABLE `reject_job`
  ADD PRIMARY KEY (`rej_id`);

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
  MODIFY `cat_id` int(20) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `chat_user`
--
ALTER TABLE `chat_user`
  MODIFY `chat_id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `createjob`
--
ALTER TABLE `createjob`
  MODIFY `subcat_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=98;
--
-- AUTO_INCREMENT for table `job_status`
--
ALTER TABLE `job_status`
  MODIFY `job_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=98;
--
-- AUTO_INCREMENT for table `profession`
--
ALTER TABLE `profession`
  MODIFY `pr_id` int(30) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=133;
--
-- AUTO_INCREMENT for table `reject_job`
--
ALTER TABLE `reject_job`
  MODIFY `rej_id` int(15) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `search`
--
ALTER TABLE `search`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=116;
--
-- AUTO_INCREMENT for table `sub_category`
--
ALTER TABLE `sub_category`
  MODIFY `subcat_id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=39;
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
