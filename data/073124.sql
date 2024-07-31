CREATE DATABASE  IF NOT EXISTS `roster` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `roster`;
-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: 127.0.0.1    Database: roster
-- ------------------------------------------------------
-- Server version	8.0.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `approved`
--

DROP TABLE IF EXISTS `approved`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `approved` (
  `shift_id` int NOT NULL,
  `user_id` int NOT NULL,
  `status` enum('approved','pending') NOT NULL,
  `approved_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `approved_by` int NOT NULL,
  PRIMARY KEY (`shift_id`,`user_id`),
  KEY `approved_by` (`approved_by`),
  KEY `shift_id` (`shift_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `approved_ibfk_1` FOREIGN KEY (`approved_by`) REFERENCES `user` (`user_id`),
  CONSTRAINT `approved_ibfk_2` FOREIGN KEY (`shift_id`) REFERENCES `shift` (`shift_id`),
  CONSTRAINT `approved_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approved`
--

LOCK TABLES `approved` WRITE;
/*!40000 ALTER TABLE `approved` DISABLE KEYS */;
INSERT INTO `approved` VALUES (1,4,'pending','2024-07-28 09:22:12',1),(2,1,'pending','2024-07-28 09:22:12',1),(2,2,'pending','2024-07-28 09:22:12',1),(3,10,'pending','2024-07-28 09:22:12',1),(4,6,'pending','2024-07-28 09:22:12',1),(4,8,'pending','2024-07-28 09:22:12',1),(6,1,'pending','2024-07-28 09:22:12',1),(6,3,'pending','2024-07-28 09:22:12',1),(7,10,'pending','2024-07-28 09:22:12',1),(9,10,'pending','2024-07-28 09:22:12',1),(10,5,'pending','2024-07-28 09:22:12',1),(11,11,'pending','2024-07-28 09:22:12',1),(12,3,'pending','2024-07-28 09:22:12',1),(13,11,'pending','2024-07-28 09:22:12',1),(14,2,'pending','2024-07-28 09:22:12',1),(15,4,'pending','2024-07-28 09:22:12',1),(16,3,'pending','2024-07-28 09:22:12',1),(16,6,'pending','2024-07-28 09:22:12',1),(17,10,'pending','2024-07-28 09:22:12',1),(18,2,'pending','2024-07-28 09:22:12',1),(18,7,'pending','2024-07-28 09:22:12',1),(20,1,'pending','2024-07-28 09:22:12',1),(20,6,'pending','2024-07-28 09:22:12',1),(21,10,'pending','2024-07-28 09:22:12',1),(25,10,'pending','2024-07-28 09:22:12',1),(25,11,'pending','2024-07-28 09:22:12',1),(26,5,'pending','2024-07-28 09:22:12',1),(26,9,'pending','2024-07-28 09:22:12',1),(27,11,'pending','2024-07-28 09:22:12',1),(28,9,'pending','2024-07-28 09:22:12',1),(29,4,'pending','2024-07-28 09:22:12',1),(38,3,'pending','2024-07-28 09:22:12',1),(39,11,'pending','2024-07-28 09:22:12',1),(40,5,'pending','2024-07-28 09:22:12',1),(40,9,'pending','2024-07-28 09:22:12',1),(41,11,'pending','2024-07-28 09:22:12',1),(42,3,'pending','2024-07-28 09:22:12',1),(42,5,'pending','2024-07-28 09:22:12',1),(43,4,'pending','2024-07-28 09:22:12',1),(50,8,'pending','2024-07-28 09:22:12',1),(54,5,'pending','2024-07-28 09:22:12',1),(54,9,'pending','2024-07-28 09:22:12',1),(56,5,'pending','2024-07-28 09:22:12',1),(56,9,'pending','2024-07-28 09:22:12',1),(57,4,'pending','2024-07-28 09:25:53',1),(59,4,'pending','2024-07-28 09:25:53',1);
/*!40000 ALTER TABLE `approved` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `day`
--

DROP TABLE IF EXISTS `day`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `day` (
  `day_id` int NOT NULL AUTO_INCREMENT,
  `week_id` int DEFAULT NULL,
  `day_num` int NOT NULL,
  `month` int DEFAULT NULL,
  `status` enum('closed','pending') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`day_id`),
  KEY `week_id` (`week_id`),
  CONSTRAINT `day_ibfk_1` FOREIGN KEY (`week_id`) REFERENCES `week` (`week_id`),
  CONSTRAINT `day_chk_1` CHECK (((`month` >= 1) and (`month` <= 12)))
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `day`
--

LOCK TABLES `day` WRITE;
/*!40000 ALTER TABLE `day` DISABLE KEYS */;
INSERT INTO `day` VALUES (1,34,4,8,'pending'),(2,34,5,8,'pending'),(3,34,6,8,'pending'),(4,34,7,8,'pending'),(5,34,8,8,'pending'),(6,34,9,8,'pending'),(7,34,10,8,'pending'),(8,35,11,8,'pending'),(9,35,12,8,'pending'),(10,35,13,8,'pending'),(11,35,14,8,'pending'),(12,35,15,8,'pending'),(13,35,16,8,'pending'),(14,35,17,8,'pending'),(15,36,18,8,'pending'),(16,36,19,8,'pending'),(17,36,20,8,'pending'),(18,36,21,8,'pending'),(19,36,22,8,'pending'),(20,36,23,8,'pending'),(21,36,24,8,'pending'),(22,37,25,8,'pending'),(23,37,26,8,'pending'),(24,37,27,8,'pending'),(25,37,28,8,'pending'),(26,37,29,8,'pending'),(27,37,30,8,'pending'),(28,37,31,8,'pending'),(29,38,1,9,'pending'),(30,38,2,9,'pending'),(31,38,3,9,'pending'),(32,38,4,9,'pending'),(33,38,5,9,'pending'),(34,38,6,9,'pending'),(35,38,7,9,'pending'),(36,39,8,9,'pending'),(37,39,9,9,'pending'),(38,39,10,9,'pending'),(39,39,11,9,'pending'),(40,39,12,9,'pending'),(41,39,13,9,'pending'),(42,39,14,9,'pending');
/*!40000 ALTER TABLE `day` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nurse`
--

DROP TABLE IF EXISTS `nurse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nurse` (
  `user_id` int NOT NULL,
  `band` int NOT NULL,
  `seniority` int NOT NULL DEFAULT '1',
  `can_charge` tinyint(1) NOT NULL,
  `contract_type` enum('full','part') NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `nurse_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nurse`
--

LOCK TABLES `nurse` WRITE;
/*!40000 ALTER TABLE `nurse` DISABLE KEYS */;
INSERT INTO `nurse` VALUES (1,7,3,1,'full'),(2,6,2,1,'full'),(3,5,1,0,'full'),(4,5,1,0,'full'),(5,5,3,0,'full'),(6,5,5,1,'full'),(7,6,7,1,'full'),(8,6,8,1,'full'),(9,5,1,0,'full'),(10,5,1,0,'full'),(11,5,2,0,'full'),(12,5,3,0,'full'),(13,5,4,0,'full'),(14,7,10,1,'full'),(15,5,1,0,'full');
/*!40000 ALTER TABLE `nurse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request` (
  `shift_id` int NOT NULL,
  `user_id` int NOT NULL,
  `priority_user` int NOT NULL,
  `priority_computed` int NOT NULL,
  `request_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('approved','pending','rejected') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`shift_id`,`user_id`),
  KEY `shift_id_index` (`shift_id`) USING BTREE,
  KEY `request_ibfk_2` (`user_id`),
  CONSTRAINT `request_ibfk_1` FOREIGN KEY (`shift_id`) REFERENCES `shift` (`shift_id`),
  CONSTRAINT `request_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
INSERT INTO `request` VALUES (1,4,6,0,'2024-07-22 20:36:00','approved'),(2,1,6,0,'2024-07-22 20:36:00','approved'),(2,2,6,0,'2024-07-22 20:36:00','approved'),(2,3,6,0,'2024-07-22 20:36:00','rejected'),(2,6,6,0,'2024-07-22 20:36:00','rejected'),(2,7,6,0,'2024-07-22 20:36:00','rejected'),(2,8,5,0,'2024-07-22 20:36:00','rejected'),(3,10,6,0,'2024-07-22 20:36:00','approved'),(4,1,5,0,'2024-07-22 20:36:00','rejected'),(4,2,5,0,'2024-07-22 20:36:00','rejected'),(4,6,5,0,'2024-07-22 20:36:00','approved'),(4,7,5,0,'2024-07-22 20:36:00','rejected'),(4,8,6,0,'2024-07-22 20:36:00','approved'),(6,1,6,0,'2024-07-22 20:36:00','approved'),(6,2,4,0,'2024-07-22 20:36:00','rejected'),(6,3,6,0,'2024-07-22 20:36:00','approved'),(6,6,4,0,'2024-07-22 20:36:00','rejected'),(6,7,4,0,'2024-07-22 20:36:00','rejected'),(6,8,4,0,'2024-07-22 20:36:00','rejected'),(6,9,6,0,'2024-07-22 20:36:00','rejected'),(7,10,5,0,'2024-07-22 20:36:00','approved'),(9,10,4,0,'2024-07-22 20:36:00','approved'),(10,5,6,0,'2024-07-22 20:36:00','approved'),(11,11,6,0,'2024-07-22 20:36:00','approved'),(12,3,4,0,'2024-07-22 20:36:00','approved'),(13,11,5,0,'2024-07-22 20:36:00','approved'),(14,2,1,0,'2024-07-22 20:36:00','approved'),(15,4,5,0,'2024-07-22 20:36:00','approved'),(16,1,3,0,'2024-07-22 20:36:00','rejected'),(16,2,3,0,'2024-07-22 20:36:00','rejected'),(16,3,4,0,'2024-07-22 20:36:00','approved'),(16,6,3,0,'2024-07-22 20:36:00','approved'),(16,7,3,0,'2024-07-22 20:36:00','rejected'),(17,10,3,0,'2024-07-22 20:36:00','approved'),(18,1,2,0,'2024-07-22 20:36:00','rejected'),(18,2,2,0,'2024-07-22 20:36:00','approved'),(18,7,2,0,'2024-07-22 20:36:00','approved'),(20,1,1,0,'2024-07-22 20:36:00','approved'),(20,6,2,0,'2024-07-22 20:36:00','approved'),(21,10,2,0,'2024-07-22 20:36:00','approved'),(25,10,1,0,'2024-07-22 20:36:00','approved'),(25,11,4,0,'2024-07-22 20:36:00','approved'),(26,5,5,0,'2024-07-22 20:36:00','approved'),(26,6,1,0,'2024-07-22 20:36:00','rejected'),(26,7,1,0,'2024-07-22 20:36:00','rejected'),(26,8,3,0,'2024-07-22 20:36:00','rejected'),(26,9,5,0,'2024-07-22 20:36:00','approved'),(27,11,3,0,'2024-07-22 20:36:00','approved'),(28,9,1,0,'2024-07-22 20:36:00','approved'),(29,4,4,0,'2024-07-22 20:36:00','approved'),(38,3,2,0,'2024-07-22 20:36:00','approved'),(39,11,2,0,'2024-07-22 20:36:00','approved'),(40,3,3,0,'2024-07-22 20:36:00','rejected'),(40,5,4,0,'2024-07-22 20:36:00','approved'),(40,8,2,0,'2024-07-22 20:36:00','rejected'),(40,9,4,0,'2024-07-22 20:36:00','approved'),(41,11,1,0,'2024-07-22 20:36:00','approved'),(42,3,1,0,'2024-07-22 20:36:00','approved'),(42,5,1,0,'2024-07-22 20:36:00','approved'),(43,4,3,0,'2024-07-22 20:36:00','approved'),(46,1,3,0,'2024-07-30 21:56:42','approved'),(49,1,5,0,'2024-07-30 21:56:42','approved'),(50,8,1,0,'2024-07-22 20:36:00','approved'),(51,1,4,0,'2024-07-31 15:49:59','approved'),(54,5,3,0,'2024-07-22 20:36:00','approved'),(54,9,3,0,'2024-07-22 20:36:00','approved'),(56,5,2,0,'2024-07-22 20:36:00','approved'),(56,9,2,0,'2024-07-22 20:36:00','approved');
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule_priority`
--

DROP TABLE IF EXISTS `schedule_priority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedule_priority` (
  `priority_id` int NOT NULL,
  `user_id` int NOT NULL,
  `priority` int NOT NULL,
  PRIMARY KEY (`priority_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `schedule_priority_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule_priority`
--

LOCK TABLES `schedule_priority` WRITE;
/*!40000 ALTER TABLE `schedule_priority` DISABLE KEYS */;
INSERT INTO `schedule_priority` VALUES (1,1,1),(1,2,2),(1,3,3),(1,4,4),(1,5,5),(1,6,6),(1,7,7),(1,8,8),(1,9,9),(1,10,10),(1,11,11),(1,12,12),(1,13,13),(1,14,14),(1,15,15),(2,1,15),(2,2,14),(2,3,13),(2,4,12),(2,5,11),(2,6,10),(2,7,9),(2,8,8),(2,9,7),(2,10,6),(2,11,5),(2,12,4),(2,13,3),(2,14,2),(2,15,1),(3,1,1),(3,2,2),(3,3,3),(3,4,4),(3,5,5),(3,6,6),(3,7,7),(3,8,8),(3,9,9),(3,10,10),(3,11,11),(3,12,12),(3,13,13),(3,14,14),(3,15,15);
/*!40000 ALTER TABLE `schedule_priority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shift`
--

DROP TABLE IF EXISTS `shift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shift` (
  `shift_id` int NOT NULL AUTO_INCREMENT,
  `day_id` int NOT NULL,
  `priority_id` int NOT NULL,
  `is_day` tinyint(1) NOT NULL DEFAULT '1',
  `approved_staff` int NOT NULL DEFAULT '0',
  `charge_nurse` int DEFAULT NULL,
  `min_staff` int NOT NULL,
  `max_staff` int NOT NULL,
  `optimal_staff` int NOT NULL,
  `status` enum('approved','open','closed') NOT NULL DEFAULT 'closed',
  PRIMARY KEY (`shift_id`),
  KEY `charge_nurse` (`charge_nurse`),
  KEY `day_id_index` (`day_id`) USING BTREE,
  KEY `shift_ibfk_2` (`priority_id`),
  CONSTRAINT `shift_ibfk_1` FOREIGN KEY (`day_id`) REFERENCES `day` (`day_id`),
  CONSTRAINT `shift_ibfk_2` FOREIGN KEY (`priority_id`) REFERENCES `schedule_priority` (`priority_id`),
  CONSTRAINT `shift_ibfk_3` FOREIGN KEY (`charge_nurse`) REFERENCES `nurse` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shift`
--

LOCK TABLES `shift` WRITE;
/*!40000 ALTER TABLE `shift` DISABLE KEYS */;
INSERT INTO `shift` VALUES (1,1,1,1,0,NULL,3,5,4,'open'),(2,1,1,0,2,NULL,2,4,3,'closed'),(3,2,1,1,0,NULL,3,5,4,'open'),(4,2,1,0,2,NULL,2,4,3,'closed'),(5,3,1,1,0,NULL,3,5,4,'open'),(6,3,1,0,2,NULL,2,4,3,'closed'),(7,4,1,1,0,NULL,3,5,4,'open'),(8,4,1,0,0,NULL,2,4,3,'open'),(9,5,1,1,0,NULL,3,5,4,'open'),(10,5,1,0,0,NULL,2,4,3,'open'),(11,6,1,1,0,NULL,3,5,4,'open'),(12,6,1,0,0,NULL,2,4,3,'open'),(13,7,1,1,0,NULL,3,5,4,'open'),(14,7,1,0,0,NULL,2,4,3,'open'),(15,8,1,1,0,NULL,3,5,4,'open'),(16,8,1,0,2,NULL,2,4,3,'closed'),(17,9,1,1,0,NULL,3,5,4,'open'),(18,9,1,0,2,NULL,2,4,3,'closed'),(19,10,1,1,0,NULL,3,5,4,'open'),(20,10,1,0,2,NULL,2,4,3,'closed'),(21,11,1,1,0,NULL,3,5,4,'open'),(22,11,1,0,0,NULL,2,4,3,'open'),(23,12,1,1,0,NULL,3,5,4,'open'),(24,12,1,0,0,NULL,2,4,3,'open'),(25,13,1,1,0,NULL,3,5,4,'open'),(26,13,1,0,2,NULL,2,4,3,'closed'),(27,14,1,1,0,NULL,3,5,4,'open'),(28,14,1,0,0,NULL,2,4,3,'open'),(29,15,1,1,0,NULL,3,5,4,'open'),(30,15,1,0,0,NULL,2,4,3,'open'),(31,16,1,1,0,NULL,3,5,4,'open'),(32,16,1,0,0,NULL,2,4,3,'open'),(33,17,1,1,0,NULL,3,5,4,'open'),(34,17,1,0,0,NULL,2,4,3,'open'),(35,18,1,1,0,NULL,3,5,4,'open'),(36,18,2,0,0,NULL,2,4,3,'open'),(37,19,2,1,0,NULL,3,5,4,'open'),(38,19,2,0,0,NULL,2,4,3,'open'),(39,20,2,1,0,NULL,3,5,4,'open'),(40,20,2,0,2,NULL,2,4,3,'closed'),(41,21,2,1,0,NULL,3,5,4,'open'),(42,21,2,0,2,NULL,2,4,3,'closed'),(43,22,2,1,0,NULL,3,5,4,'open'),(44,22,2,0,0,NULL,2,4,3,'open'),(45,23,2,1,0,NULL,3,5,4,'open'),(46,23,2,0,0,NULL,2,4,3,'open'),(47,24,2,1,0,NULL,3,5,4,'open'),(48,24,2,0,0,NULL,2,4,3,'open'),(49,25,2,1,0,NULL,3,5,4,'open'),(50,25,2,0,0,NULL,2,4,3,'open'),(51,26,2,1,0,NULL,3,5,4,'open'),(52,26,2,0,0,NULL,2,4,3,'open'),(53,27,2,1,0,NULL,3,5,4,'open'),(54,27,2,0,2,NULL,2,4,3,'closed'),(55,28,2,1,0,NULL,3,5,4,'open'),(56,28,2,0,2,NULL,2,4,3,'closed'),(57,29,2,1,0,NULL,3,5,4,'open'),(58,29,2,0,0,NULL,2,4,3,'open'),(59,30,2,1,0,NULL,3,5,4,'open'),(60,30,2,0,0,NULL,2,4,3,'open'),(61,31,2,1,0,NULL,3,5,4,'open'),(62,31,2,0,0,NULL,2,4,3,'open'),(63,32,2,1,0,NULL,3,5,4,'open'),(64,32,2,0,0,NULL,2,4,3,'open'),(65,33,2,1,0,NULL,3,5,4,'open'),(66,33,2,0,0,NULL,2,4,3,'open'),(67,34,2,1,0,NULL,3,5,4,'open'),(68,34,2,0,0,NULL,2,4,3,'open'),(69,35,2,1,0,NULL,3,5,4,'open'),(70,35,2,0,0,NULL,2,4,3,'open'),(71,36,3,1,0,NULL,3,5,4,'open'),(72,36,3,0,0,NULL,2,4,3,'open'),(73,37,3,1,0,NULL,3,5,4,'open'),(74,37,3,0,0,NULL,2,4,3,'open'),(75,38,3,1,0,NULL,3,5,4,'open'),(76,38,3,0,0,NULL,2,4,3,'open'),(77,39,3,1,0,NULL,3,5,4,'open'),(78,39,3,0,0,NULL,2,4,3,'open'),(79,40,3,1,0,NULL,3,5,4,'open'),(80,40,3,0,0,NULL,2,4,3,'open'),(81,41,3,1,0,NULL,3,5,4,'open'),(82,41,3,0,0,NULL,2,4,3,'open'),(83,42,3,1,0,NULL,3,5,4,'open'),(84,42,3,0,0,NULL,2,4,3,'open');
/*!40000 ALTER TABLE `shift` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'joe','han','1@t.com','test'),(2,'yeweon','kim','2@t.com','test'),(3,'jayne','white','3@t.com','test'),(4,'donald','trump','4@t.com','test'),(5,'joe','biden','5@t.com','test'),(6,'barack','obama','6@t.com','test'),(7,'davis','sithideth','7@t.com','test'),(8,'dimitri','nakos','8@t.com','test'),(9,'lindsey','lawless','9@t.com','test'),(10,'halley','wang','10@t.com','test'),(11,'juan','hernendez','11@t.com','test'),(12,'lando','borghi','12@t.com','test'),(13,'paul','beck','13@t.com','test'),(14,'nobby','nataka','14@t.com','test'),(15,'lindsey','xhao','15@t.com','test');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `week`
--

DROP TABLE IF EXISTS `week`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `week` (
  `week_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `priority_id` int NOT NULL,
  `month` int DEFAULT NULL,
  `year` int NOT NULL,
  `week_start` date NOT NULL,
  `week_end` date NOT NULL,
  `status` enum('completed','pending') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`week_id`,`user_id`),
  KEY `user_id` (`user_id`),
  KEY `week_ibfk_2` (`priority_id`),
  CONSTRAINT `week_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `week_ibfk_2` FOREIGN KEY (`priority_id`) REFERENCES `schedule_priority` (`priority_id`),
  CONSTRAINT `week_chk_1` CHECK (((`month` >= 1) and (`month` <= 12)))
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `week`
--

LOCK TABLES `week` WRITE;
/*!40000 ALTER TABLE `week` DISABLE KEYS */;
INSERT INTO `week` VALUES (34,1,1,8,2024,'2024-08-04','2024-08-10','pending'),(35,1,1,8,2024,'2024-08-11','2024-08-17','pending'),(36,1,1,8,2024,'2024-08-12','2024-08-24','pending'),(37,1,1,8,2024,'2024-08-25','2024-08-31','pending'),(38,1,2,9,2024,'2024-09-01','2024-09-07','pending'),(39,1,2,9,2024,'2024-09-08','2024-09-14','pending');
/*!40000 ALTER TABLE `week` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-31 16:53:48
