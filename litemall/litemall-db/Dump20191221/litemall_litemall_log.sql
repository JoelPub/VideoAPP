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
-- Table structure for table `litemall_log`
--

DROP TABLE IF EXISTS `litemall_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `litemall_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '管理员',
  `ip` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '管理员地址',
  `type` int(11) DEFAULT NULL COMMENT '操作分类',
  `action` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '操作动作',
  `status` tinyint(1) DEFAULT NULL COMMENT '操作状态',
  `result` varchar(127) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '操作结果，或者成功消息，或者失败消息',
  `comment` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '补充信息',
  `add_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted` tinyint(1) DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='操作日志表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `litemall_log`
--

LOCK TABLES `litemall_log` WRITE;
/*!40000 ALTER TABLE `litemall_log` DISABLE KEYS */;
INSERT INTO `litemall_log` VALUES (1,'admin123','116.231.68.143',1,'登录',1,'','','2019-12-21 17:38:13','2019-12-21 17:38:13',0),(2,'admin123','116.231.68.143',1,'登录',1,'','','2019-12-21 18:19:15','2019-12-21 18:19:15',0),(3,'admin123','116.231.68.143',1,'登录',1,'','','2019-12-21 20:49:52','2019-12-21 20:49:52',0),(4,'admin123','116.231.68.143',1,'退出',1,'','','2019-12-21 20:58:37','2019-12-21 20:58:37',0),(5,'admin123','116.231.68.143',1,'登录',1,'','','2019-12-21 20:59:29','2019-12-21 20:59:29',0),(6,'admin123','116.231.68.143',1,'退出',1,'','','2019-12-21 21:01:58','2019-12-21 21:01:58',0),(7,'admin123','116.231.68.143',1,'登录',1,'','','2019-12-21 21:02:06','2019-12-21 21:02:06',0),(8,'admin123','116.231.68.143',1,'退出',1,'','','2019-12-21 21:02:27','2019-12-21 21:02:27',0),(9,'匿名用户','116.231.68.143',1,'登录',0,'用户帐号或密码不正确','','2019-12-21 21:02:30','2019-12-21 21:02:30',0),(10,'admin123','116.231.68.143',1,'登录',1,'','','2019-12-21 21:02:39','2019-12-21 21:02:39',0),(11,'admin123','116.231.68.143',1,'退出',1,'','','2019-12-21 21:02:49','2019-12-21 21:02:49',0),(12,'mall123','116.231.68.143',1,'登录',1,'','','2019-12-21 21:03:06','2019-12-21 21:03:06',0),(13,'mall123','116.231.68.143',1,'退出',1,'','','2019-12-21 21:03:39','2019-12-21 21:03:39',0),(14,'mall123','116.231.68.143',1,'登录',1,'','','2019-12-21 21:03:51','2019-12-21 21:03:51',0),(15,'mall123','116.231.68.143',1,'退出',1,'','','2019-12-21 21:03:57','2019-12-21 21:03:57',0),(16,'promotion123','116.231.68.143',1,'登录',1,'','','2019-12-21 21:04:49','2019-12-21 21:04:49',0),(17,'promotion123','116.231.68.143',1,'退出',1,'','','2019-12-21 21:05:04','2019-12-21 21:05:04',0),(18,'promotion123','116.231.68.143',1,'登录',1,'','','2019-12-21 21:05:14','2019-12-21 21:05:14',0),(19,'promotion123','116.231.68.143',1,'退出',1,'','','2019-12-21 21:05:18','2019-12-21 21:05:18',0),(20,'admin123','116.231.68.143',1,'登录',1,'','','2019-12-21 21:06:25','2019-12-21 21:06:25',0);
/*!40000 ALTER TABLE `litemall_log` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-21 21:25:17
