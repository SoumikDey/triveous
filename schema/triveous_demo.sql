-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 22, 2020 at 05:19 AM
-- Server version: 10.1.33-MariaDB
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `triveous_demo`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookmark`
--

CREATE TABLE `bookmark` (
  `bookmark_id` varchar(1000) NOT NULL,
  `bookmark_link` varchar(1000) NOT NULL,
  `bookmark_title` varchar(500) NOT NULL,
  `time_created` int(11) NOT NULL,
  `time_updated` int(11) NOT NULL,
  `publisher` varchar(500) NOT NULL,
  `dml_status_flag` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='table to store bookmarks';

--
-- Dumping data for table `bookmark`
--

INSERT INTO `bookmark` (`bookmark_id`, `bookmark_link`, `bookmark_title`, `time_created`, `time_updated`, `publisher`, `dml_status_flag`) VALUES
('dd8c4091-38c6-4d30-830e-258f0cb58818', 'link1', 'public', 1595337652, 1595337652, 'pub1', 0);

-- --------------------------------------------------------

--
-- Table structure for table `bookmark_tags_map`
--

CREATE TABLE `bookmark_tags_map` (
  `bookmark_id` varchar(500) NOT NULL,
  `tag_id` varchar(500) NOT NULL,
  `time_created` int(11) NOT NULL,
  `time_updated` int(11) DEFAULT NULL,
  `dml_status_flag` int(1) NOT NULL DEFAULT '0' COMMENT '0 for insert, 1 for update,  2 for delete'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bookmark_tags_map`
--

INSERT INTO `bookmark_tags_map` (`bookmark_id`, `tag_id`, `time_created`, `time_updated`, `dml_status_flag`) VALUES
('4a837cc9-f62e-45b5-be7c-91ec2c88c86f', 'cee72d45-a087-4dcb-b3d6-0f0e9273d5a7', 1595317994, 1595317994, 0),
('502ae831-76f2-4199-8dc9-e40e94ec38ed', 'cee72d45-a087-4dcb-b3d6-0f0e9273d5a7', 1595318039, 1595318039, 0),
('502ae831-76f2-4199-8dc9-e40e94ec38ed', '3e324e2f-119a-47e3-9a2d-fb83f149acb6', 1595318040, 1595318040, 0),
('6e15735a-d7e5-471b-9c36-2ceeaeb881f5', 'cee72d45-a087-4dcb-b3d6-0f0e9273d5a7', 1595318309, 1595318309, 0),
('6e15735a-d7e5-471b-9c36-2ceeaeb881f5', '3e324e2f-119a-47e3-9a2d-fb83f149acb6', 1595318309, 1595318309, 0),
('6e15735a-d7e5-471b-9c36-2ceeaeb881f5', '325a58be-7470-47a3-bb80-427d62f2d1f5', 1595318309, 1595318309, 0),
('6b815e1e-8202-4439-b7e4-37f6a17dd9e5', '3e324e2f-119a-47e3-9a2d-fb83f149acb6', 1595334415, 1595334492, 2),
('dd8c4091-38c6-4d30-830e-258f0cb58818', '80ef02c6-8f10-46da-a6fa-b9e2239a0d0f', 1595337652, 1595337652, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tags_master`
--

CREATE TABLE `tags_master` (
  `tag_id` varchar(1000) NOT NULL,
  `tag_title` varchar(1000) NOT NULL,
  `time_created` int(11) NOT NULL,
  `time_updated` int(11) DEFAULT NULL,
  `dml_status_flag` int(1) NOT NULL COMMENT '0 for insert, 1 for update,  2 for delete'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tags_master`
--

INSERT INTO `tags_master` (`tag_id`, `tag_title`, `time_created`, `time_updated`, `dml_status_flag`) VALUES
('e9c0a595-ac64-4d6f-8264-c89dac3482c7', 'tyr', 1595337540, 1595337540, 0),
('80ef02c6-8f10-46da-a6fa-b9e2239a0d0f', 'police', 1595337548, 1595337548, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookmark`
--
ALTER TABLE `bookmark`
  ADD UNIQUE KEY `bookmark_title_UNIQUE` (`bookmark_title`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
