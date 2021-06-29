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
  `moveId` int NOT NULL,
  `videoId` int NOT NULL,
  `startTimestamp` int NOT NULL,
  `endTimestamp` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `move_idx` (`moveId`),
  KEY `video_idx` (`videoId`),
  CONSTRAINT `move` FOREIGN KEY (`moveId`) REFERENCES `moves` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `video` FOREIGN KEY (`videoId`) REFERENCES `videos` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO moves VALUES (0, "Triangle Choke");
INSERT INTO moves VALUES (0, "Arm Bar");

INSERT INTO videos VALUES (0, "https://www.youtube.com/watch?v=uXjLfSFkqTs");
INSERT INTO videos VALUES (0, "https://www.youtube.com/watch?v=23enzBqgkhs");

INSERT INTO events VALUES(0, 1, 1, 263, 296);
INSERT INTO events VALUES(0, 2, 1, 313, 322);
INSERT INTO events VALUES(0, 2, 2, 0, 11);

