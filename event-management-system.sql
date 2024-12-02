CREATE TABLE `User` (
  `user_id` integer PRIMARY KEY AUTO_INCREMENT,
  `first_name` varchar(255),
  `last_name` varchar(255),
  `email` varchar(255) UNIQUE,
  `password_hash` varchar(255),
  `profile_picture_url` text,
  `phone_number` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp,
  `status` varchar(255) DEFAULT 'active'
);

CREATE TABLE `Event` (
  `event_id` integer PRIMARY KEY AUTO_INCREMENT,
  `organizer` integer,
  `title` varchar(255),
  `description` text,
  `date` timestamp,
  `start_time` timestamp,
  `end_time` timestamp,
  `duration` integer,
  `address` varchar(255),
  `max_attendees` integer,
  `attendee_count` integer,
  `is_public` boolean DEFAULT true,
  `event_image_url` text,
  `event_icon_url` text,
  `category_id` integer,
  `created_at` timestamp,
  `updated_at` timestamp,
  `closed_at` timestamp,
  `status` varchar(255) DEFAULT 'open'
);

CREATE TABLE `RSVP` (
  `rsvp_id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer,
  `event_id` integer,
  `status` varchar(255) DEFAULT 'pending',
  `rsvp_date` timestamp,
  `notes` text
);

CREATE TABLE `IntegratedCalendar` (
  `integration_id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer,
  `calendar_type` varchar(255),
  `calendar_sync_date` timestamp,
  `sync_status` varchar(255)
);

CREATE TABLE `Category` (
  `category_id` integer PRIMARY KEY AUTO_INCREMENT,
  `category_name` varchar(255),
  `description` text
);

CREATE TABLE `Notification_User` (
  `notification_id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer,
  `event_id` integer,
  `notification_type` varchar(255),
  `message` text,
  `status` varchar(255) DEFAULT 'unread',
  `sent_at` timestamp,
  `read_at` timestamp
);

ALTER TABLE `Event` ADD FOREIGN KEY (`organizer`) REFERENCES `User` (`user_id`);

ALTER TABLE `Event` ADD FOREIGN KEY (`category_id`) REFERENCES `Category` (`category_id`);

ALTER TABLE `RSVP` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);

ALTER TABLE `RSVP` ADD FOREIGN KEY (`event_id`) REFERENCES `Event` (`event_id`);

ALTER TABLE `IntegratedCalendar` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);

ALTER TABLE `Notification_User` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);

ALTER TABLE `Notification_User` ADD FOREIGN KEY (`event_id`) REFERENCES `Event` (`event_id`);
