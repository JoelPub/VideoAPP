-- MySQL dump 10.13  Distrib 8.0.17, for macos10.14 (x86_64)
--
-- Host: 47.92.135.77    Database: litemall
-- ------------------------------------------------------
-- Server version	5.6.46

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
-- Table structure for table `litemall_permission`
--

DROP TABLE IF EXISTS `litemall_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `litemall_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) DEFAULT NULL COMMENT '角色ID',
  `permission` varchar(63) DEFAULT NULL COMMENT '权限',
  `add_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted` tinyint(1) DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COMMENT='权限表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `litemall_permission`
--

LOCK TABLES `litemall_permission` WRITE;
/*!40000 ALTER TABLE `litemall_permission` DISABLE KEYS */;
INSERT INTO `litemall_permission` VALUES (1,1,'*','2019-01-01 00:00:00','2019-01-01 00:00:00',0),(2,2,'admin:category:read','2019-01-07 15:18:53','2019-01-07 15:18:53',0),(3,2,'admin:category:update','2019-01-07 15:18:53','2019-01-07 15:18:53',0),(4,2,'admin:category:delete','2019-01-07 15:18:53','2019-01-07 15:18:53',0),(5,2,'admin:category:create','2019-01-07 15:18:53','2019-01-07 15:18:53',0),(6,2,'admin:category:list','2019-01-07 15:18:53','2019-01-07 15:18:53',0),(7,2,'admin:brand:create','2019-01-07 15:18:53','2019-01-07 15:18:53',0),(8,2,'admin:brand:list','2019-01-07 15:18:53','2019-01-07 15:18:53',0),(9,2,'admin:brand:delete','2019-01-07 15:18:53','2019-01-07 15:18:53',0),(10,2,'admin:brand:read','2019-01-07 15:18:53','2019-01-07 15:18:53',0),(11,2,'admin:brand:update','2019-01-07 15:18:53','2019-01-07 15:18:53',0),(12,3,'admin:ad:list','2019-01-07 15:18:57','2019-01-07 15:18:57',0),(13,3,'admin:ad:delete','2019-01-07 15:18:57','2019-01-07 15:18:57',0),(14,3,'admin:ad:create','2019-01-07 15:18:57','2019-01-07 15:18:57',0),(15,3,'admin:ad:update','2019-01-07 15:18:57','2019-01-07 15:18:57',0),(16,3,'admin:ad:read','2019-01-07 15:18:57','2019-01-07 15:18:57',0),(17,3,'admin:groupon:list','2019-01-07 15:18:57','2019-01-07 15:18:57',0),(18,3,'admin:groupon:update','2019-01-07 15:18:57','2019-01-07 15:18:57',0),(19,3,'admin:groupon:create','2019-01-07 15:18:57','2019-01-07 15:18:57',0),(20,3,'admin:groupon:read','2019-01-07 15:18:57','2019-01-07 15:18:57',0),(21,3,'admin:groupon:delete','2019-01-07 15:18:57','2019-01-07 15:18:57',0),(22,3,'admin:topic:create','2019-01-07 15:18:57','2019-01-07 15:18:57',0),(23,3,'admin:topic:read','2019-01-07 15:18:57','2019-01-07 15:18:57',0),(24,3,'admin:topic:list','2019-01-07 15:18:57','2019-01-07 15:18:57',0),(25,3,'admin:topic:delete','2019-01-07 15:18:57','2019-01-07 15:18:57',0),(26,3,'admin:topic:update','2019-01-07 15:18:57','2019-01-07 15:18:57',0),(27,3,'admin:coupon:list','2019-01-07 15:18:57','2019-01-07 15:18:57',0),(28,3,'admin:coupon:delete','2019-01-07 15:18:57','2019-01-07 15:18:57',0),(29,3,'admin:coupon:read','2019-01-07 15:18:57','2019-01-07 15:18:57',0),(30,3,'admin:coupon:create','2019-01-07 15:18:57','2019-01-07 15:18:57',0),(31,3,'admin:coupon:update','2019-01-07 15:18:57','2019-01-07 15:18:57',0);
/*!40000 ALTER TABLE `litemall_permission` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-21 21:23:36
