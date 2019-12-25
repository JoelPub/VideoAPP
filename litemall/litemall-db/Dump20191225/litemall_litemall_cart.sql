-- MySQL dump 10.13  Distrib 8.0.18, for macos10.14 (x86_64)
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
-- Table structure for table `litemall_cart`
--

DROP TABLE IF EXISTS `litemall_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `litemall_cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '用户表的用户ID',
  `goods_id` int(11) DEFAULT NULL COMMENT '商品表的商品ID',
  `goods_sn` varchar(63) DEFAULT NULL COMMENT '商品编号',
  `goods_name` varchar(127) DEFAULT NULL COMMENT '商品名称',
  `product_id` int(11) DEFAULT NULL COMMENT '商品货品表的货品ID',
  `price` decimal(10,2) DEFAULT '0.00' COMMENT '商品货品的价格',
  `number` smallint(5) DEFAULT '0' COMMENT '商品货品的数量',
  `specifications` varchar(1023) DEFAULT NULL COMMENT '商品规格值列表，采用JSON数组格式',
  `checked` tinyint(1) DEFAULT '1' COMMENT '购物车中商品是否选择状态',
  `pic_url` varchar(255) DEFAULT NULL COMMENT '商品图片或者商品货品图片',
  `add_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted` tinyint(1) DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COMMENT='购物车商品表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `litemall_cart`
--

LOCK TABLES `litemall_cart` WRITE;
/*!40000 ALTER TABLE `litemall_cart` DISABLE KEYS */;
INSERT INTO `litemall_cart` VALUES (2,2,1110016,'1110016','天然硅胶宠物除毛按摩刷',150,39.00,1,'[\"标准\"]',1,'http://yanxuan.nosdn.127.net/3bd73b7279a83d1cbb50c0e45778e6d6.png','2019-12-21 12:52:37','2019-12-21 12:52:37',1),(3,3,1110016,'1110016','天然硅胶宠物除毛按摩刷',150,39.00,1,'[\"标准\"]',1,'http://yanxuan.nosdn.127.net/3bd73b7279a83d1cbb50c0e45778e6d6.png','2019-12-21 17:32:36','2019-12-21 17:32:36',1),(4,3,1110016,'1110016','天然硅胶宠物除毛按摩刷',251,39.00,1,'[\"标准\"]',1,'http://yanxuan.nosdn.127.net/3bd73b7279a83d1cbb50c0e45778e6d6.png','2019-12-21 18:23:26','2019-12-21 18:23:26',1),(5,3,1110016,'1110016','天然硅胶宠物除毛按摩刷',252,0.01,1,'[\"标准\"]',1,'http://yanxuan.nosdn.127.net/3bd73b7279a83d1cbb50c0e45778e6d6.png','2019-12-21 18:27:20','2019-12-21 18:29:00',1),(6,2,1110016,'1110016','天然硅胶宠物除毛按摩刷',257,0.02,1,'[\"标准\"]',1,'https://www.haidanmm.com/litemallsl/wx/storage/fetch/zn8jvkhdyyvzv4bfnsjc.jpeg','2019-12-21 21:45:34','2019-12-21 21:45:34',1),(7,2,1065004,'1065001','海胆妹妹小麦胚芽夹心海苔',262,12.80,1,'[\"标准\",\"10g\"]',1,'https://www.haidanmm.com/litemallsl/wx/storage/fetch/2poqfy7cvj5aubpsmsi8.jpeg','2019-12-22 09:47:36','2019-12-22 09:47:36',1),(8,2,1065004,'1065001','海胆妹妹小麦胚芽夹心海苔',262,12.80,1,'[\"标准\",\"10g\"]',1,'https://www.haidanmm.com/litemallsl/wx/storage/fetch/2poqfy7cvj5aubpsmsi8.jpeg','2019-12-22 13:57:54','2019-12-22 13:57:54',1),(9,2,1065004,'1065001','海胆妹妹小麦胚芽夹心海苔',262,12.80,1,'[\"标准\",\"10g\"]',1,'https://www.haidanmm.com/litemallsl/wx/storage/fetch/2poqfy7cvj5aubpsmsi8.jpeg','2019-12-22 14:09:12','2019-12-22 14:09:12',1),(10,2,1065004,'1065001','海胆妹妹小麦胚芽夹心海苔',262,12.80,1,'[\"标准\",\"10g\"]',1,'https://www.haidanmm.com/litemallsl/wx/storage/fetch/2poqfy7cvj5aubpsmsi8.jpeg','2019-12-22 14:48:55','2019-12-22 14:48:55',1),(11,2,1143018,'1143018','海胆妹妹小麦胚芽夹心海苔',263,98.00,1,'[\"标准\",\"10g/袋*10\"]',1,'https://www.haidanmm.com/litemallsl/wx/storage/fetch/y17mhtud9cfnv1fw2koa.jpeg','2019-12-23 22:05:21','2019-12-23 22:05:21',1);
/*!40000 ALTER TABLE `litemall_cart` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-25 10:41:47
