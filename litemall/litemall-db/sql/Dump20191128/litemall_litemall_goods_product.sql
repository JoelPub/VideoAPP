-- MySQL dump 10.13  Distrib 8.0.17, for macos10.14 (x86_64)
--
-- Host: localhost    Database: litemall
-- ------------------------------------------------------
-- Server version	5.5.62

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
-- Table structure for table `litemall_goods_product`
--

DROP TABLE IF EXISTS `litemall_goods_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `litemall_goods_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goods_id` int(11) NOT NULL DEFAULT '0' COMMENT '商品表的商品ID',
  `specifications` varchar(1023) NOT NULL COMMENT '商品规格值列表，采用JSON数组格式',
  `price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '商品货品价格',
  `number` int(11) NOT NULL DEFAULT '0' COMMENT '商品货品数量',
  `url` varchar(125) DEFAULT NULL COMMENT '商品货品图片',
  `add_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted` tinyint(1) DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=253 DEFAULT CHARSET=utf8mb4 COMMENT='商品货品表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `litemall_goods_product`
--

LOCK TABLES `litemall_goods_product` WRITE;
/*!40000 ALTER TABLE `litemall_goods_product` DISABLE KEYS */;
INSERT INTO `litemall_goods_product` VALUES (58,1045000,'[\"标准\"]',28.00,99,'https://i.ibb.co/C1LLsHT/5.jpg','2018-02-01 00:00:00','2019-11-28 07:37:55',1),(85,1070000,'[\"标准\"]',26.00,100,'https://i.ibb.co/C1LLsHT/5.jpg','2018-02-01 00:00:00','2018-02-01 00:00:00',0),(145,1110007,'[\"标准\"]',299.00,100,'https://i.ibb.co/C1LLsHT/5.jpg','2018-02-01 00:00:00','2018-02-01 00:00:00',0),(167,1116011,'[\"标准\"]',36.00,82,'https://i.ibb.co/C1LLsHT/5.jpg','2018-02-01 00:00:00','2018-11-09 19:23:10',0),(200,1134036,'[\"标准\"]',38.00,100,'https://i.ibb.co/C1LLsHT/5.jpg','2018-02-01 00:00:00','2018-02-01 00:00:00',0),(222,1143018,'[\"标准\"]',68.00,100,'https://i.ibb.co/C1LLsHT/5.jpg','2018-02-01 00:00:00','2018-02-01 00:00:00',0),(223,1143019,'[\"标准\"]',98.00,100,'https://i.ibb.co/C1LLsHT/5.jpg','2018-02-01 00:00:00','2018-02-01 00:00:00',0),(224,1143020,'[\"标准\"]',168.00,100,'https://i.ibb.co/C1LLsHT/5.jpg','2018-02-01 00:00:00','2018-02-01 00:00:00',0),(252,1045000,'[\"标准\"]',0.01,95,'https://i.ibb.co/C1LLsHT/5.jpg','2019-11-28 07:34:33','2019-11-28 07:34:58',0);
/*!40000 ALTER TABLE `litemall_goods_product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-28 15:45:21
