CREATE DATABASE `bjj_classified` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE `moves` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `videos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `moveId` int DEFAULT NULL,
  `videoId` int DEFAULT NULL,
  `timestamp` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `move_idx` (`moveId`),
  KEY `video_idx` (`videoId`),
  CONSTRAINT `move` FOREIGN KEY (`moveId`) REFERENCES `moves` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `video` FOREIGN KEY (`videoId`) REFERENCES `videos` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO moves VALUES (0, "Triangle Choke");
INSERT INTO moves VALUES (0, "Arm Bar");

INSERT INTO videos VALUES (0, "https://www.youtube.com/watch?v=uXjLfSFkqTs");

INSERT INTO events VALUES(0, 1, 1, 263);

