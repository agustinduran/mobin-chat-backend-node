-- boilerplate-nodejs.users definition

CREATE TABLE `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(40) NOT NULL,
  `password` VARCHAR(80) NOT NULL,
  `email` VARCHAR(80) DEFAULT NULL,
  `name` VARCHAR(80) DEFAULT NULL,
  `surname` VARCHAR(80) DEFAULT NULL,
  `phone` VARCHAR(40) DEFAULT NULL,
  `roles` LONGTEXT DEFAULT '["ROLE_USER"]',
  `active` TINYINT(4) NOT NULL DEFAULT 1,
  `image` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT current_timestamp(),
  `updated_at` TIMESTAMP NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=467 DEFAULT CHARSET=latin1;

CREATE TABLE `chats` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_user_transmitter` INT(11) NOT NULL,
  `id_user_receiver` INT(11) NOT NULL,
  `timestamp` BIGINT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT current_timestamp(),
  `updated_at` TIMESTAMP NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_user_transmitter`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (`id_user_receiver`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=467 DEFAULT CHARSET=latin1;