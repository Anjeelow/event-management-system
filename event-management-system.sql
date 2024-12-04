-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 04, 2024 at 09:13 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `event-management-system`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `description`) VALUES
(1, 'Physical and Wellness', 'Events that are primarily physical or focus on the wellbeing of a person. Marathons, yoga, etc. are part of this category.'),
(2, 'Weddings', 'The celebration of two people coming together as one.'),
(3, 'Talk Shows, Podcasts', 'Listen to someone talk for hours on end.');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `event_id` int(11) NOT NULL,
  `organizer` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `start_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `end_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `duration` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `max_attendees` int(11) DEFAULT NULL,
  `attendee_count` int(11) DEFAULT NULL,
  `is_public` tinyint(1) DEFAULT 1,
  `event_image_url` text DEFAULT NULL,
  `event_icon_url` text DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `closed_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `status` varchar(255) DEFAULT 'open'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`event_id`, `organizer`, `title`, `description`, `date`, `start_time`, `end_time`, `duration`, `address`, `max_attendees`, `attendee_count`, `is_public`, `event_image_url`, `event_icon_url`, `category_id`, `created_at`, `updated_at`, `closed_at`, `status`) VALUES
(1, 2, 'Angelo Pumar Wedding', 'Wedding of Angelo Pumar and his fiancee.', '2025-01-15 07:30:00', '2025-01-15 07:30:00', '2025-01-15 14:45:00', 435, 'Shangri-La Mactan', 100, 27, 0, '', '', 2, '2024-11-23 11:55:12', '2024-11-23 11:55:12', '2024-12-15 11:30:00', 'Open'),
(2, 1, 'Reeces Pieces', 'Monthly Podcast by Reece Sergei Lim', '2024-12-10 11:00:00', '2024-12-10 11:00:00', '2024-12-10 12:30:00', 90, 'MR Hall, University of San Carlos Talamban Campus', 500, 493, 1, '', '', 3, '2024-11-25 11:55:12', '2024-11-25 11:55:12', '2024-11-30 12:30:00', 'Closed'),
(3, 3, 'Fitness Bootcamp with Philip Go', 'An intensive fitness bootcamp to help you achieve your health goals.', '2024-12-19 22:00:00', '2024-12-19 22:00:00', '2024-12-20 01:00:00', 180, 'Cebu City Sports Complex', 150, 80, 1, '', '', 1, '2024-11-26 02:00:00', '2024-11-26 02:00:00', '2024-12-15 15:59:00', 'Open'),
(4, 2, 'Angelo & Reece Anniversary Party', 'Celebrating a year of love and happiness.', '2024-12-05 10:00:00', '2024-12-05 10:00:00', '2024-12-05 15:00:00', 300, 'Radisson Blu Cebu', 200, 180, 0, '', '', 2, '2024-11-24 01:00:00', '2024-11-24 01:00:00', '2024-11-30 15:59:00', 'Open'),
(5, 1, 'Tech Talk by Reece Lim', 'Join Reece Lim as he shares insights on emerging technologies.', '2025-01-05 06:00:00', '2025-01-05 06:00:00', '2025-01-05 08:00:00', 120, 'USC Main Auditorium', 300, 290, 1, '', '', 3, '2024-11-27 03:00:00', '2024-11-27 03:00:00', '2025-01-01 15:59:00', 'Open'),
(6, 3, 'January Networking Event', 'A networking event to kick off 2025 with industry leaders.', '2025-01-15 01:00:00', '2025-01-15 01:00:00', '2025-01-16 09:00:00', 1920, '456 Business Park, Cityville', 200, 150, 1, 'https://example.com/january_event.jpg', 'https://example.com/january_icon.png', 2, '2025-01-10 09:00:00', '2025-01-10 09:00:00', '2025-01-17 10:00:00', 'Open');

-- --------------------------------------------------------

--
-- Table structure for table `integratedcalendar`
--

CREATE TABLE `integratedcalendar` (
  `integration_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `calendar_type` varchar(255) DEFAULT NULL,
  `calendar_sync_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `sync_status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `notification_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL,
  `notification_type` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `status` varchar(255) DEFAULT 'unread',
  `sent_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `read_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification_user`
--

CREATE TABLE `notification_user` (
  `user_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rsvp`
--

CREATE TABLE `rsvp` (
  `rsvp_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'pending',
  `rsvp_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `profile_picture_url` text DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `status` varchar(255) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `email`, `password_hash`, `profile_picture_url`, `phone_number`, `created_at`, `updated_at`, `status`) VALUES
(1, 'Reece', 'Lim', 'reece@gmail.com', 'temp', '', '+63 999 888 7777', '2024-11-17 05:47:22', '2024-11-26 01:25:47', 'Active'),
(2, 'Angelo', 'Pumar', 'gelo@gmail.com', 'pass', '', '+63 222 111 3333', '2024-11-19 11:22:43', '2024-11-19 11:22:43', 'Active'),
(3, 'Philip', 'Go', 'philip@gmail.com', 'word', '', '+63 444 555 6666', '2024-11-25 09:01:02', '2024-11-29 07:12:56', 'Active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `organizer` (`organizer`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `integratedcalendar`
--
ALTER TABLE `integratedcalendar`
  ADD PRIMARY KEY (`integration_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `notification_user`
--
ALTER TABLE `notification_user`
  ADD PRIMARY KEY (`user_id`,`event_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `rsvp`
--
ALTER TABLE `rsvp`
  ADD PRIMARY KEY (`rsvp_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`organizer`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `event_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

--
-- Constraints for table `integratedcalendar`
--
ALTER TABLE `integratedcalendar`
  ADD CONSTRAINT `integratedcalendar_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`);

--
-- Constraints for table `notification_user`
--
ALTER TABLE `notification_user`
  ADD CONSTRAINT `notification_user_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `notification_user_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`);

--
-- Constraints for table `rsvp`
--
ALTER TABLE `rsvp`
  ADD CONSTRAINT `rsvp_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `rsvp_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `event` (`event_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
