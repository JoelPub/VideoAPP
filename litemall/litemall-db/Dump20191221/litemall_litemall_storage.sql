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
-- Table structure for table `litemall_storage`
--

DROP TABLE IF EXISTS `litemall_storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `litemall_storage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(63) NOT NULL COMMENT '文件的唯一索引',
  `name` varchar(255) NOT NULL COMMENT '文件名',
  `type` varchar(20) NOT NULL COMMENT '文件类型',
  `size` int(11) NOT NULL COMMENT '文件大小',
  `url` varchar(255) DEFAULT NULL COMMENT '文件访问链接',
  `add_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted` tinyint(1) DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='文件存储表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `litemall_storage`
--

LOCK TABLES `litemall_storage` WRITE;
/*!40000 ALTER TABLE `litemall_storage` DISABLE KEYS */;
INSERT INTO `litemall_storage` VALUES (1,'f4d77g5d9b2h7mb534us.jpeg','getheadimg.jpeg','image/jpeg',8384,'https://www.haidanmm.com/litemallsl/wx/storage/fetch/f4d77g5d9b2h7mb534us.jpeg','2019-12-21 20:51:25','2019-12-21 20:51:25',0),(2,'3goc0kza7mkmdv8whga8.gif','download.gif','image/gif',14057,'https://www.haidanmm.com/litemallsl/wx/storage/fetch/3goc0kza7mkmdv8whga8.gif','2019-12-21 20:51:52','2019-12-21 20:51:52',0),(3,'sa9d4djrxqf6gbzjhyga.jpeg','getheadimg.jpeg','image/jpeg',8384,'https://www.haidanmm.com/litemallsl/wx/storage/fetch/sa9d4djrxqf6gbzjhyga.jpeg','2019-12-21 20:52:01','2019-12-21 20:52:01',0),(4,'y82h8p0254kz5sdho9u7.jpeg','4.jpeg','image/jpeg',363432,'https://www.haidanmm.com/litemallsl/wx/storage/fetch/y82h8p0254kz5sdho9u7.jpeg','2019-12-21 20:54:36','2019-12-21 20:54:36',0),(5,'zn8jvkhdyyvzv4bfnsjc.jpeg','4.jpeg','image/jpeg',363432,'https://www.haidanmm.com/litemallsl/wx/storage/fetch/zn8jvkhdyyvzv4bfnsjc.jpeg','2019-12-21 20:54:56','2019-12-21 20:54:56',0),(6,'zviqj9abtmhfticsqfex.jpeg','3.jpeg','image/jpeg',660873,'https://www.haidanmm.com/litemallsl/wx/storage/fetch/zviqj9abtmhfticsqfex.jpeg','2019-12-21 20:55:32','2019-12-21 20:55:32',0);
/*!40000 ALTER TABLE `litemall_storage` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-21 21:24:04
