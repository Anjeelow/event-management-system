-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 06, 2024 at 08:55 AM
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
  `date` varchar(255) DEFAULT NULL,
  `start_time` varchar(255) DEFAULT NULL,
  `end_time` varchar(255) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `max_attendees` int(11) DEFAULT NULL,
  `attendee_count` int(11) DEFAULT NULL,
  `is_public` tinyint(1) DEFAULT 1,
  `event_image_url` text DEFAULT NULL,
  `event_icon_url` text DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  `closed_at` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'open'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`event_id`, `organizer`, `title`, `description`, `date`, `start_time`, `end_time`, `duration`, `address`, `max_attendees`, `attendee_count`, `is_public`, `event_image_url`, `event_icon_url`, `category_id`, `created_at`, `updated_at`, `closed_at`, `status`) VALUES
(1, 2, 'Angelo Pumar Wedding', 'Wedding of Angelo Pumar and his fiancee.', '2025-01-15T07:30:00.000Z', '2025-01-15T07:30:00.000Z', '2025-01-15T14:45:00.000Z', 435, 'Shangri-La Mactan', 100, 27, 0, '', '', 2, '2024-11-23 11:55:12', '2024-11-23 11:55:12', '2024-12-15 11:30:00', 'Open'),
(2, 1, 'Reeces Pieces', 'Monthly Podcast by Reece Sergei Lim', '2024-12-10T11:00:00.000Z', '2024-12-10T11:00:00.000Z', '2024-12-10T12:30:00.000Z', 90, 'MR Hall, University of San Carlos Talamban Campus', 500, 493, 1, '', '', 3, '2024-11-25 11:55:12', '2024-11-25 11:55:12', '2024-11-30 12:30:00', 'Closed'),
(3, 3, 'Fitness Bootcamp with Philip Go', 'An intensive fitness bootcamp to help you achieve your health goals.', '2024-12-19T22:00:00.000Z', '2024-12-19T22:00:00.000Z', '2024-12-20T01:00:00.000Z', 180, 'Cebu City Sports Complex', 150, 80, 1, '', '', 1, '2024-11-26 02:00:00', '2024-11-26 02:00:00', '2024-12-15 15:59:00', 'Open'),
(4, 2, 'Angelo & Reece Anniversary Party', 'Celebrating a year of love and happiness.', '2024-12-05T10:00:00.000Z', '2024-12-05T10:00:00.000Z', '2024-12-05T15:00:00.000Z', 300, 'Radisson Blu Cebu', 200, 180, 0, '', '', 2, '2024-11-24 01:00:00', '2024-11-24 01:00:00', '2024-11-30 15:59:00', 'Open'),
(5, 1, 'Tech Talk by Reece Lim', 'Join Reece Lim as he shares insights on emerging technologies.', '2025-01-05T06:00:00.000Z', '2025-01-05T06:00:00.000Z', '2025-01-05T08:00:00.000Z', 120, 'USC Main Auditorium', 300, 290, 1, '', '', 3, '2024-11-27 03:00:00', '2024-11-27 03:00:00', '2025-01-01 15:59:00', 'Open'),
(6, 3, 'January Networking Event', 'A networking event to kick off 2025 with industry leaders.', '2025-01-15T01:00:00.000Z', '2025-01-15T01:00:00.000Z', '2025-01-16T09:00:00.000Z', 1920, '456 Business Park, Cityville', 200, 150, 1, 'https://example.com/january_event.jpg', 'https://example.com/january_icon.png', 2, '2025-01-10 09:00:00', '2025-01-10 09:00:00', '2025-01-17 10:00:00', 'Open');

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

--
-- Dumping data for table `rsvp`
--

INSERT INTO `rsvp` (`rsvp_id`, `user_id`, `event_id`, `status`, `rsvp_date`, `notes`) VALUES
(1, 3, 1, 'Attending', '2024-11-26 11:00:10', 'unlimited food please'),
(2, 3, 2, 'Attending', '2024-11-26 11:12:24', 'Hi Reece.'),
(3, 1, 1, 'Attending', '2024-11-28 06:23:30', 'Hi Angelo.'),
(4, 4, 1, 'Attending', '2024-11-29 06:23:30', 'Hi Angelo.'),
(5, 6, 1, 'Attending', '2024-11-30 06:23:30', 'Hi Angelo.'),
(6, 7, 1, 'Attending', '2024-12-01 06:23:30', 'Hi Angelo.'),
(7, 9, 1, 'Attending', '2024-12-01 06:23:30', 'Hi Angelo.');

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
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` varchar(255) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `email`, `password_hash`, `profile_picture_url`, `phone_number`, `created_at`, `updated_at`, `status`) VALUES
(1, 'Reece', 'Lim', 'reece@gmail.com', '$2b$10$9ktXcN9czonQyHakcmuzPujZDs24.NcelJYD9qEfjiIBki.X1tHY2', NULL, NULL, '2024-12-06 07:49:46', '2024-12-06 07:49:46', 'active'),
(2, 'Angelo', 'Pumar', 'gelo@gmail.com', '$2b$10$l/YuvWE01EEvB3EDIeqKZuMF7jfm4ULzqONJHCw9eWfiNHUsoQm2K', NULL, NULL, '2024-12-06 07:50:20', '2024-12-06 07:50:20', 'active'),
(3, 'Philip', 'Go', 'philip@gmail.com', '$2b$10$mYXNM5TiwS/SlceMUTJgGOeoTs7TrLxBdxgfYS6IinqX8CrZld75C', NULL, NULL, '2024-12-06 07:50:45', '2024-12-06 07:50:45', 'active'),
(4, 'John', 'Doe', 'john@gmail.com', '$2b$10$qdh0t1hLnmX.TGlzb3VRL.GGyIk4QojRb4tcda/ybHkFmTCexh28e', NULL, NULL, '2024-12-06 07:52:06', '2024-12-06 07:52:06', 'active'),
(5, 'Jane', 'Smith', 'jane@gmail.com', '$2b$10$XGmLfccQPYTgmoVwT2L0nOSKagEW0Ma0tRHAUuQuU1HKU9ZgOPZym', NULL, NULL, '2024-12-06 07:52:48', '2024-12-06 07:52:48', 'active'),
(6, 'Alice', 'Johnson', 'alice@gmail.com', '$2b$10$pKk/3TCm5DW8UHVRPPdXR.q1ZROtObFHowgONbLU7ySI1C5lmXU6S', NULL, NULL, '2024-12-06 07:53:12', '2024-12-06 07:53:12', 'active'),
(7, 'Michael', 'Brown', 'michael@gmail.com', '$2b$10$qjqy6dxijLe4wPjas/uVUOZ/dgC/ksCoojijLVqEsdd1EMA./5gz.', NULL, NULL, '2024-12-06 07:53:44', '2024-12-06 07:53:44', 'active'),
(8, 'Emily', 'Davis', 'emily@gmail.com', '$2b$10$l4cOev/sMdRIvdQweDMlRuq/0Sgz2.sokhNcLTdnVuVgXTS8A5WAO', NULL, NULL, '2024-12-06 07:53:58', '2024-12-06 07:53:58', 'active'),
(9, 'Chris', 'Taylor', 'chris@gmail.com', '$2b$10$L1vnQ/8JKsprZWlN7Q1l6uzT1w7C.D1kdt7uL9BuV3JjspHsjjY9G', NULL, NULL, '2024-12-06 07:54:13', '2024-12-06 07:54:13', 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
