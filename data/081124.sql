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
/*!40000 ALTER TABLE `approved` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compute_record`
--

DROP TABLE IF EXISTS `compute_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compute_record` (
  `month` int NOT NULL,
  `year` int NOT NULL,
  `iteration` int NOT NULL,
  `record_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`month`,`year`,`iteration`),
  UNIQUE KEY `record_id` (`record_id`),
  KEY `record_id_index` (`record_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compute_record`
--

LOCK TABLES `compute_record` WRITE;
/*!40000 ALTER TABLE `compute_record` DISABLE KEYS */;
/*!40000 ALTER TABLE `compute_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conflict`
--

DROP TABLE IF EXISTS `conflict`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conflict` (
  `record_id` int NOT NULL,
  `user_id` int NOT NULL,
  `shift_id` int NOT NULL,
  PRIMARY KEY (`record_id`,`user_id`,`shift_id`),
  KEY `user_id` (`user_id`),
  KEY `shift_id` (`shift_id`),
  CONSTRAINT `conflict_ibfk_1` FOREIGN KEY (`record_id`) REFERENCES `compute_record` (`record_id`),
  CONSTRAINT `conflict_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `conflict_ibfk_3` FOREIGN KEY (`shift_id`) REFERENCES `shift` (`shift_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conflict`
--

LOCK TABLES `conflict` WRITE;
/*!40000 ALTER TABLE `conflict` DISABLE KEYS */;
/*!40000 ALTER TABLE `conflict` ENABLE KEYS */;
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
  CONSTRAINT `nurse_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nurse`
--

LOCK TABLES `nurse` WRITE;
/*!40000 ALTER TABLE `nurse` DISABLE KEYS */;
INSERT INTO `nurse` VALUES (1,6,13,1,'full'),(2,6,2,1,'full'),(3,5,1,0,'full'),(4,5,1,0,'full'),(5,5,3,0,'full'),(6,5,5,1,'full'),(7,6,7,1,'full'),(8,6,8,1,'full'),(9,5,1,0,'full'),(10,5,1,0,'full'),(11,5,2,0,'full'),(12,5,3,0,'full'),(13,5,4,0,'full'),(14,7,10,1,'full'),(15,5,1,0,'full'),(26,7,1,0,'full');
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
INSERT INTO `request` VALUES (1,5,6,0,'2024-08-10 20:45:22','rejected'),(1,7,11,0,'2024-08-10 20:46:06','approved'),(1,10,12,0,'2024-08-10 20:27:14','approved'),(1,11,11,0,'2024-08-10 20:47:24','approved'),(2,1,10,0,'2024-08-10 20:44:05','rejected'),(2,3,10,0,'2024-08-10 20:24:20','approved'),(2,4,11,0,'2024-08-10 20:45:10','approved'),(2,9,7,0,'2024-08-10 20:47:02','rejected'),(3,5,5,0,'2024-08-10 20:45:22','rejected'),(3,7,10,0,'2024-08-10 20:46:06','approved'),(3,10,11,0,'2024-08-10 20:27:14','approved'),(3,13,9,0,'2024-08-10 20:47:49','approved'),(4,1,10,0,'2024-08-10 20:23:44','rejected'),(4,4,12,0,'2024-08-10 20:24:46','approved'),(4,9,3,0,'2024-08-10 20:26:51','rejected'),(4,12,3,0,'2024-08-10 20:27:50','rejected'),(4,26,12,0,'2024-08-10 20:29:14','approved'),(5,5,4,0,'2024-08-10 20:45:22','rejected'),(5,10,10,0,'2024-08-10 20:27:14','approved'),(5,12,8,0,'2024-08-10 20:47:36','approved'),(5,14,9,0,'2024-08-10 20:48:03','approved'),(6,1,11,0,'2024-08-10 20:23:44','approved'),(6,2,6,0,'2024-08-10 20:24:00','approved'),(6,5,3,0,'2024-08-10 20:25:15','rejected'),(6,9,2,0,'2024-08-10 20:26:51','rejected'),(6,12,2,0,'2024-08-10 20:27:50','rejected'),(6,13,3,0,'2024-08-10 20:28:11','rejected'),(6,14,3,0,'2024-08-10 20:28:37','rejected'),(7,4,10,0,'2024-08-10 20:45:10','approved'),(7,6,10,0,'2024-08-10 20:45:48','approved'),(7,12,7,0,'2024-08-10 20:47:36','rejected'),(7,13,8,0,'2024-08-10 20:47:49','approved'),(7,14,8,0,'2024-08-10 20:48:03','rejected'),(8,1,12,0,'2024-08-10 20:23:44','approved'),(8,2,5,0,'2024-08-10 20:24:00','rejected'),(8,4,11,0,'2024-08-10 20:24:46','rejected'),(8,5,2,0,'2024-08-10 20:25:15','rejected'),(8,7,12,0,'2024-08-10 20:26:14','approved'),(8,8,12,0,'2024-08-10 20:26:32','rejected'),(8,9,1,0,'2024-08-10 20:26:51','rejected'),(8,12,1,0,'2024-08-10 20:27:50','rejected'),(8,13,2,0,'2024-08-10 20:28:11','rejected'),(8,14,2,0,'2024-08-10 20:28:37','rejected'),(8,26,11,0,'2024-08-10 20:29:14','rejected'),(9,2,8,0,'2024-08-10 20:44:26','approved'),(9,8,10,0,'2024-08-10 20:46:48','approved'),(9,12,6,0,'2024-08-10 20:47:36','rejected'),(9,14,6,0,'2024-08-10 20:48:03','rejected'),(9,15,10,0,'2024-08-10 20:28:56','approved'),(10,2,4,0,'2024-08-10 20:24:00','rejected'),(10,5,1,0,'2024-08-10 20:25:15','rejected'),(10,6,12,0,'2024-08-10 20:25:49','approved'),(10,7,11,0,'2024-08-10 20:26:14','rejected'),(10,8,11,0,'2024-08-10 20:26:32','rejected'),(10,11,12,0,'2024-08-10 20:27:34','approved'),(10,13,1,0,'2024-08-10 20:28:11','rejected'),(10,14,1,0,'2024-08-10 20:28:37','rejected'),(11,2,7,0,'2024-08-10 20:44:26','rejected'),(11,8,11,0,'2024-08-10 20:46:48','approved'),(11,9,5,0,'2024-08-10 20:47:02','rejected'),(11,13,7,0,'2024-08-10 20:47:49','rejected'),(11,15,11,0,'2024-08-10 20:28:56','approved'),(11,26,10,0,'2024-08-10 20:53:30','approved'),(12,3,12,0,'2024-08-10 20:24:20','approved'),(12,4,10,0,'2024-08-10 20:24:46','rejected'),(12,6,11,0,'2024-08-10 20:25:49','approved'),(12,7,10,0,'2024-08-10 20:26:14','rejected'),(12,8,10,0,'2024-08-10 20:26:32','rejected'),(12,11,11,0,'2024-08-10 20:27:34','rejected'),(12,26,10,0,'2024-08-10 20:29:14','rejected'),(13,8,12,0,'2024-08-10 20:46:48','approved'),(13,9,6,0,'2024-08-10 20:47:02','rejected'),(13,15,12,0,'2024-08-10 20:28:56','approved'),(13,26,11,0,'2024-08-10 20:53:30','approved'),(14,3,11,0,'2024-08-10 20:24:20','approved'),(14,6,10,0,'2024-08-10 20:25:49','rejected'),(14,11,10,0,'2024-08-10 20:27:34','approved'),(15,5,3,0,'2024-08-10 20:45:22','rejected'),(15,10,9,0,'2024-08-10 20:27:14','approved'),(15,14,5,0,'2024-08-10 20:48:03','approved'),(15,15,9,0,'2024-08-10 20:48:17','approved'),(16,1,7,0,'2024-08-10 20:44:05','approved'),(16,3,7,0,'2024-08-10 20:24:20','approved'),(16,26,7,0,'2024-08-10 20:53:30','rejected'),(17,5,2,0,'2024-08-10 20:45:22','rejected'),(17,10,8,0,'2024-08-10 20:27:14','approved'),(17,11,8,0,'2024-08-10 20:47:24','approved'),(17,13,6,0,'2024-08-10 20:47:49','approved'),(18,1,7,0,'2024-08-10 20:23:44','rejected'),(18,4,9,0,'2024-08-10 20:24:46','approved'),(18,9,6,0,'2024-08-10 20:26:51','rejected'),(18,12,6,0,'2024-08-10 20:27:50','rejected'),(18,26,8,0,'2024-08-10 20:29:14','approved'),(19,5,1,0,'2024-08-10 20:45:22','rejected'),(19,10,7,0,'2024-08-10 20:27:14','approved'),(19,11,7,0,'2024-08-10 20:47:24','approved'),(19,12,5,0,'2024-08-10 20:47:36','approved'),(20,1,8,0,'2024-08-10 20:23:44','approved'),(20,2,9,0,'2024-08-10 20:24:00','approved'),(20,5,6,0,'2024-08-10 20:25:15','rejected'),(20,9,5,0,'2024-08-10 20:26:51','rejected'),(20,12,5,0,'2024-08-10 20:27:50','rejected'),(20,13,6,0,'2024-08-10 20:28:11','rejected'),(20,14,6,0,'2024-08-10 20:28:37','rejected'),(21,4,8,0,'2024-08-10 20:45:10','approved'),(21,6,8,0,'2024-08-10 20:45:48','approved'),(21,8,5,0,'2024-08-10 20:46:48','approved'),(21,12,4,0,'2024-08-10 20:47:36','rejected'),(21,13,5,0,'2024-08-10 20:47:49','rejected'),(21,14,4,0,'2024-08-10 20:48:03','rejected'),(22,1,9,0,'2024-08-10 20:23:44','approved'),(22,2,8,0,'2024-08-10 20:24:00','rejected'),(22,4,8,0,'2024-08-10 20:24:46','rejected'),(22,5,5,0,'2024-08-10 20:25:15','rejected'),(22,7,3,0,'2024-08-10 20:26:14','rejected'),(22,8,3,0,'2024-08-10 20:26:32','rejected'),(22,9,4,0,'2024-08-10 20:26:51','rejected'),(22,12,4,0,'2024-08-10 20:27:50','rejected'),(22,13,5,0,'2024-08-10 20:28:11','rejected'),(22,14,5,0,'2024-08-10 20:28:37','rejected'),(22,26,9,0,'2024-08-10 20:29:14','approved'),(23,2,5,0,'2024-08-10 20:44:26','approved'),(23,4,7,0,'2024-08-10 20:45:10','approved'),(23,7,6,0,'2024-08-10 20:46:06','approved'),(23,9,2,0,'2024-08-10 20:47:02','rejected'),(23,12,3,0,'2024-08-10 20:47:36','rejected'),(23,14,3,0,'2024-08-10 20:48:03','rejected'),(24,2,7,0,'2024-08-10 20:24:00','rejected'),(24,5,4,0,'2024-08-10 20:25:15','rejected'),(24,6,9,0,'2024-08-10 20:25:49','approved'),(24,7,2,0,'2024-08-10 20:26:14','rejected'),(24,8,2,0,'2024-08-10 20:26:32','rejected'),(24,11,9,0,'2024-08-10 20:27:34','approved'),(24,13,4,0,'2024-08-10 20:28:11','rejected'),(24,14,4,0,'2024-08-10 20:28:37','rejected'),(24,15,9,0,'2024-08-10 20:28:56','rejected'),(25,2,4,0,'2024-08-10 20:44:26','approved'),(25,7,5,0,'2024-08-10 20:46:06','approved'),(25,8,6,0,'2024-08-10 20:46:48','approved'),(25,9,3,0,'2024-08-10 20:47:02','rejected'),(25,13,4,0,'2024-08-10 20:47:49','rejected'),(26,3,9,0,'2024-08-10 20:24:20','approved'),(26,4,7,0,'2024-08-10 20:24:46','rejected'),(26,6,8,0,'2024-08-10 20:25:49','rejected'),(26,7,1,0,'2024-08-10 20:26:14','rejected'),(26,8,1,0,'2024-08-10 20:26:32','rejected'),(26,11,8,0,'2024-08-10 20:27:34','rejected'),(26,15,8,0,'2024-08-10 20:28:56','approved'),(26,26,7,0,'2024-08-10 20:29:14','rejected'),(27,6,7,0,'2024-08-10 20:45:48','approved'),(27,7,4,0,'2024-08-10 20:46:06','approved'),(27,8,9,0,'2024-08-10 20:46:48','approved'),(27,9,4,0,'2024-08-10 20:47:02','rejected'),(28,3,8,0,'2024-08-10 20:24:20','approved'),(28,6,7,0,'2024-08-10 20:25:49','rejected'),(28,11,7,0,'2024-08-10 20:27:34','rejected'),(28,15,7,0,'2024-08-10 20:28:56','approved'),(29,6,6,0,'2024-08-10 20:45:48','approved'),(29,8,4,0,'2024-08-10 20:46:48','rejected'),(29,10,6,0,'2024-08-10 20:27:14','approved'),(29,11,6,0,'2024-08-10 20:47:24','approved'),(30,1,6,0,'2024-08-10 20:44:05','approved'),(30,3,6,0,'2024-08-10 20:24:20','approved'),(30,15,6,0,'2024-08-10 20:48:17','rejected'),(31,4,6,0,'2024-08-10 20:45:10','approved'),(31,6,2,0,'2024-08-10 20:45:48','rejected'),(31,10,5,0,'2024-08-10 20:27:14','approved'),(31,26,6,0,'2024-08-10 20:53:30','approved'),(32,1,4,0,'2024-08-10 20:23:44','rejected'),(32,9,9,0,'2024-08-10 20:26:51','approved'),(32,12,9,0,'2024-08-10 20:27:50','approved'),(32,26,4,0,'2024-08-10 20:29:14','rejected'),(33,2,12,0,'2024-08-10 20:12:11','approved'),(33,5,12,0,'2024-08-10 20:25:15','approved'),(33,10,4,0,'2024-08-10 20:27:14','rejected'),(33,14,10,0,'2024-08-10 20:28:37','approved'),(34,1,5,0,'2024-08-10 20:23:44','rejected'),(34,9,8,0,'2024-08-10 20:26:51','approved'),(34,12,8,0,'2024-08-10 20:27:50','rejected'),(34,13,12,0,'2024-08-10 20:28:11','approved'),(35,2,11,0,'2024-08-10 20:12:11','approved'),(35,5,11,0,'2024-08-10 20:25:15','approved'),(35,14,11,0,'2024-08-10 20:28:37','approved'),(36,1,6,0,'2024-08-10 20:23:44','rejected'),(36,7,9,0,'2024-08-10 20:26:14','approved'),(36,8,6,0,'2024-08-10 20:26:32','rejected'),(36,9,7,0,'2024-08-10 20:26:51','rejected'),(36,12,7,0,'2024-08-10 20:27:50','rejected'),(36,13,11,0,'2024-08-10 20:28:11','approved'),(37,2,10,0,'2024-08-10 20:12:11','approved'),(37,4,6,0,'2024-08-10 20:24:46','rejected'),(37,5,10,0,'2024-08-10 20:25:15','approved'),(37,14,12,0,'2024-08-10 20:28:37','approved'),(37,15,6,0,'2024-08-10 20:28:56','rejected'),(38,6,3,0,'2024-08-10 20:25:49','rejected'),(38,7,8,0,'2024-08-10 20:26:14','approved'),(38,8,5,0,'2024-08-10 20:26:32','rejected'),(38,11,6,0,'2024-08-10 20:27:34','rejected'),(38,13,10,0,'2024-08-10 20:28:11','approved'),(39,3,5,0,'2024-08-10 20:44:49','rejected'),(39,4,5,0,'2024-08-10 20:24:46','approved'),(39,8,3,0,'2024-08-10 20:46:48','rejected'),(39,9,1,0,'2024-08-10 20:47:02','rejected'),(39,10,4,0,'2024-08-10 20:47:11','rejected'),(39,12,2,0,'2024-08-10 20:47:36','rejected'),(39,15,5,0,'2024-08-10 20:28:56','approved'),(39,26,5,0,'2024-08-10 20:53:30','approved'),(40,3,5,0,'2024-08-10 20:24:20','rejected'),(40,6,2,0,'2024-08-10 20:25:49','rejected'),(40,7,7,0,'2024-08-10 20:26:14','approved'),(40,8,4,0,'2024-08-10 20:26:32','rejected'),(40,11,5,0,'2024-08-10 20:27:34','approved'),(41,4,4,0,'2024-08-10 20:24:46','approved'),(41,6,3,0,'2024-08-10 20:45:48','rejected'),(41,8,2,0,'2024-08-10 20:46:48','rejected'),(41,12,1,0,'2024-08-10 20:47:36','rejected'),(41,15,4,0,'2024-08-10 20:28:56','approved'),(41,26,4,0,'2024-08-10 20:53:30','approved'),(42,3,4,0,'2024-08-10 20:24:20','approved'),(42,6,1,0,'2024-08-10 20:25:49','rejected'),(42,11,4,0,'2024-08-10 20:27:34','approved'),(43,4,3,0,'2024-08-10 20:45:10','approved'),(43,8,1,0,'2024-08-10 20:46:48','rejected'),(43,14,2,0,'2024-08-10 20:48:03','approved'),(43,15,3,0,'2024-08-10 20:48:17','approved'),(44,3,3,0,'2024-08-10 20:24:20','approved'),(44,10,3,0,'2024-08-10 20:27:14','approved'),(45,1,5,0,'2024-08-10 20:44:05','approved'),(45,4,2,0,'2024-08-10 20:45:10','rejected'),(45,11,3,0,'2024-08-10 20:47:24','approved'),(45,13,3,0,'2024-08-10 20:47:49','approved'),(45,15,2,0,'2024-08-10 20:48:17','rejected'),(46,1,1,0,'2024-08-10 20:23:44','rejected'),(46,4,3,0,'2024-08-10 20:24:46','rejected'),(46,9,12,0,'2024-08-10 20:26:51','approved'),(46,10,2,0,'2024-08-10 20:27:14','rejected'),(46,12,12,0,'2024-08-10 20:27:50','approved'),(47,1,4,0,'2024-08-10 20:44:05','approved'),(47,5,9,0,'2024-08-10 20:25:15','approved'),(47,11,2,0,'2024-08-10 20:47:24','approved'),(47,14,1,0,'2024-08-10 20:48:03','rejected'),(48,1,2,0,'2024-08-10 20:23:44','rejected'),(48,2,3,0,'2024-08-10 20:24:00','rejected'),(48,9,11,0,'2024-08-10 20:26:51','approved'),(48,10,1,0,'2024-08-10 20:27:14','rejected'),(48,12,11,0,'2024-08-10 20:27:50','approved'),(48,13,9,0,'2024-08-10 20:28:11','rejected'),(48,14,9,0,'2024-08-10 20:28:37','rejected'),(49,1,3,0,'2024-08-10 20:44:05','approved'),(49,2,3,0,'2024-08-10 20:44:26','approved'),(49,5,8,0,'2024-08-10 20:25:15','approved'),(49,11,1,0,'2024-08-10 20:47:24','rejected'),(49,13,2,0,'2024-08-10 20:47:49','rejected'),(50,1,3,0,'2024-08-10 20:23:44','rejected'),(50,2,2,0,'2024-08-10 20:24:00','rejected'),(50,4,2,0,'2024-08-10 20:24:46','rejected'),(50,7,5,0,'2024-08-10 20:26:14','rejected'),(50,8,9,0,'2024-08-10 20:26:32','rejected'),(50,9,10,0,'2024-08-10 20:26:51','approved'),(50,12,10,0,'2024-08-10 20:27:50','approved'),(50,13,8,0,'2024-08-10 20:28:11','rejected'),(50,14,8,0,'2024-08-10 20:28:37','rejected'),(51,2,2,0,'2024-08-10 20:44:26','approved'),(51,5,7,0,'2024-08-10 20:25:15','approved'),(51,6,1,0,'2024-08-10 20:45:48','rejected'),(51,7,1,0,'2024-08-10 20:46:06','approved'),(51,26,1,0,'2024-08-10 20:53:30','rejected'),(52,2,1,0,'2024-08-10 20:24:00','rejected'),(52,6,6,0,'2024-08-10 20:25:49','rejected'),(52,7,6,0,'2024-08-10 20:26:14','rejected'),(52,8,8,0,'2024-08-10 20:26:32','approved'),(52,11,3,0,'2024-08-10 20:27:34','rejected'),(52,13,7,0,'2024-08-10 20:28:11','rejected'),(52,14,7,0,'2024-08-10 20:28:37','approved'),(52,15,3,0,'2024-08-10 20:28:56','rejected'),(53,2,1,0,'2024-08-10 20:44:26','rejected'),(53,3,1,0,'2024-08-10 20:44:49','rejected'),(53,7,2,0,'2024-08-10 20:46:06','approved'),(53,10,2,0,'2024-08-10 20:47:11','approved'),(53,13,1,0,'2024-08-10 20:47:49','rejected'),(53,26,2,0,'2024-08-10 20:53:30','approved'),(54,3,2,0,'2024-08-10 20:24:20','rejected'),(54,4,1,0,'2024-08-10 20:24:46','rejected'),(54,6,5,0,'2024-08-10 20:25:49','approved'),(54,7,4,0,'2024-08-10 20:26:14','rejected'),(54,8,7,0,'2024-08-10 20:26:32','approved'),(54,11,2,0,'2024-08-10 20:27:34','rejected'),(54,15,2,0,'2024-08-10 20:28:56','rejected'),(55,3,2,0,'2024-08-10 20:44:49','approved'),(55,4,1,0,'2024-08-10 20:45:10','rejected'),(55,7,3,0,'2024-08-10 20:46:06','approved'),(55,10,1,0,'2024-08-10 20:47:11','rejected'),(55,26,3,0,'2024-08-10 20:53:30','approved'),(56,3,1,0,'2024-08-10 20:24:20','rejected'),(56,6,4,0,'2024-08-10 20:25:49','approved'),(56,11,1,0,'2024-08-10 20:27:34','rejected'),(56,15,1,0,'2024-08-10 20:28:56','approved');
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
INSERT INTO `schedule_priority` VALUES (1,1,1),(1,2,2),(1,3,3),(1,4,4),(1,5,5),(1,6,6),(1,7,7),(1,8,8),(1,9,9),(1,10,10),(1,11,11),(1,12,12),(1,13,13),(1,14,14),(1,15,15),(1,26,16),(2,1,15),(2,2,14),(2,3,13),(2,4,12),(2,5,11),(2,6,10),(2,7,9),(2,8,8),(2,9,7),(2,10,6),(2,11,5),(2,12,4),(2,13,3),(2,14,2),(2,15,1),(2,26,16),(3,1,1),(3,2,2),(3,3,3),(3,4,4),(3,5,5),(3,6,6),(3,7,7),(3,8,8),(3,9,9),(3,10,10),(3,11,11),(3,12,12),(3,13,13),(3,14,14),(3,15,15);
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
INSERT INTO `shift` VALUES (1,1,1,1,3,NULL,3,5,4,'closed'),(2,1,1,0,2,NULL,2,4,3,'closed'),(3,2,1,1,3,NULL,3,5,4,'closed'),(4,2,1,0,2,NULL,2,4,3,'closed'),(5,3,1,1,3,NULL,3,5,4,'closed'),(6,3,1,0,2,NULL,2,4,3,'closed'),(7,4,1,1,3,NULL,3,5,4,'closed'),(8,4,1,0,2,NULL,2,4,3,'closed'),(9,5,1,1,3,NULL,3,5,4,'closed'),(10,5,1,0,2,NULL,2,4,3,'closed'),(11,6,1,1,3,NULL,3,5,4,'closed'),(12,6,1,0,2,NULL,2,4,3,'closed'),(13,7,1,1,3,NULL,3,5,4,'closed'),(14,7,1,0,2,NULL,2,4,3,'closed'),(15,8,1,1,3,NULL,3,5,4,'closed'),(16,8,1,0,2,NULL,2,4,3,'closed'),(17,9,1,1,3,NULL,3,5,4,'closed'),(18,9,1,0,2,NULL,2,4,3,'closed'),(19,10,1,1,3,NULL,3,5,4,'closed'),(20,10,1,0,2,NULL,2,4,3,'closed'),(21,11,1,1,3,NULL,3,5,4,'closed'),(22,11,1,0,2,NULL,2,4,3,'closed'),(23,12,1,1,3,NULL,3,5,4,'closed'),(24,12,1,0,2,NULL,2,4,3,'closed'),(25,13,1,1,3,NULL,3,5,4,'closed'),(26,13,1,0,2,NULL,2,4,3,'closed'),(27,14,1,1,3,NULL,3,5,4,'closed'),(28,14,1,0,2,NULL,2,4,3,'closed'),(29,15,1,1,3,NULL,3,5,4,'closed'),(30,15,1,0,2,NULL,2,4,3,'closed'),(31,16,1,1,3,NULL,3,5,4,'closed'),(32,16,1,0,2,NULL,2,4,3,'closed'),(33,17,1,1,3,NULL,3,5,4,'closed'),(34,17,1,0,2,NULL,2,4,3,'closed'),(35,18,1,1,3,NULL,3,5,4,'closed'),(36,18,2,0,2,NULL,2,4,3,'closed'),(37,19,2,1,3,NULL,3,5,4,'closed'),(38,19,2,0,2,NULL,2,4,3,'closed'),(39,20,2,1,3,NULL,3,5,4,'closed'),(40,20,2,0,2,NULL,2,4,3,'closed'),(41,21,2,1,3,NULL,3,5,4,'closed'),(42,21,2,0,2,NULL,2,4,3,'closed'),(43,22,2,1,3,NULL,3,5,4,'closed'),(44,22,2,0,2,NULL,2,4,3,'closed'),(45,23,2,1,3,NULL,3,5,4,'closed'),(46,23,2,0,2,NULL,2,4,3,'closed'),(47,24,2,1,3,NULL,3,5,4,'closed'),(48,24,2,0,2,NULL,2,4,3,'closed'),(49,25,2,1,3,NULL,3,5,4,'closed'),(50,25,2,0,2,NULL,2,4,3,'closed'),(51,26,2,1,3,NULL,3,5,4,'closed'),(52,26,2,0,2,NULL,2,4,3,'closed'),(53,27,2,1,3,NULL,3,5,4,'closed'),(54,27,2,0,2,NULL,2,4,3,'closed'),(55,28,2,1,3,NULL,3,5,4,'closed'),(56,28,2,0,2,NULL,2,4,3,'closed'),(57,29,2,1,0,NULL,3,5,4,'open'),(58,29,2,0,0,NULL,2,4,3,'open'),(59,30,2,1,0,NULL,3,5,4,'open'),(60,30,2,0,0,NULL,2,4,3,'open'),(61,31,2,1,0,NULL,3,5,4,'open'),(62,31,2,0,0,NULL,2,4,3,'open'),(63,32,2,1,0,NULL,3,5,4,'open'),(64,32,2,0,0,NULL,2,4,3,'open'),(65,33,2,1,0,NULL,3,5,4,'open'),(66,33,2,0,0,NULL,2,4,3,'open'),(67,34,2,1,0,NULL,3,5,4,'open'),(68,34,2,0,0,NULL,2,4,3,'open'),(69,35,2,1,0,NULL,3,5,4,'open'),(70,35,2,0,0,NULL,2,4,3,'open'),(71,36,3,1,0,NULL,3,5,4,'open'),(72,36,3,0,0,NULL,2,4,3,'open'),(73,37,3,1,0,NULL,3,5,4,'open'),(74,37,3,0,0,NULL,2,4,3,'open'),(75,38,3,1,0,NULL,3,5,4,'open'),(76,38,3,0,0,NULL,2,4,3,'open'),(77,39,3,1,0,NULL,3,5,4,'open'),(78,39,3,0,0,NULL,2,4,3,'open'),(79,40,3,1,0,NULL,3,5,4,'open'),(80,40,3,0,0,NULL,2,4,3,'open'),(81,41,3,1,0,NULL,3,5,4,'open'),(82,41,3,0,0,NULL,2,4,3,'open'),(83,42,3,1,0,NULL,3,5,4,'open'),(84,42,3,0,0,NULL,2,4,3,'open');
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
  `ms_id` varchar(36) NOT NULL DEFAULT '0',
  `authority` int NOT NULL DEFAULT '0',
  `user_status` enum('pending','active','inactive') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`user_id`),
  KEY `idx_ms_id` (`ms_id`) USING BTREE,
  KEY `idx_email` (`email`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'joe','han','jhoon.han@outlook.com','37568687-3010-490a-a12e-da0e5a57734e',1,'active'),(2,'yeweon','kim','oliviayw92@outlook.com','630133a5-f489-4736-a97e-e9c13311ba0c',2,'active'),(3,'jayne','white','3@t.com','0',1,'active'),(4,'donald','trump','4@t.com','0',1,'active'),(5,'joe','biden','5@t.com','0',1,'active'),(6,'barack','obama','6@t.com','0',1,'active'),(7,'davis','sithideth','7@t.com','0',1,'active'),(8,'dimitri','nakos','8@t.com','0',1,'active'),(9,'lindsey','lawless','9@t.com','0',1,'active'),(10,'halley','wang','10@t.com','0',1,'active'),(11,'juan','hernendez','11@t.com','0',1,'active'),(12,'lando','borghi','12@t.com','0',1,'active'),(13,'paul','beck','13@t.com','0',1,'active'),(14,'nobby','nataka','14@t.com','0',1,'active'),(15,'lindsey','xhao','15@t.com','0',1,'active'),(26,'Junghoon','Han','hanj1112@outlook.com','5b70e515-c9db-4e64-9600-ce00dd409d6c',1,'active');
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

-- Dump completed on 2024-08-11  8:15:30
