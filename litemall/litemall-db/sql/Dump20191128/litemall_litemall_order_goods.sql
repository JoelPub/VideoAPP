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
-- Table structure for table `litemall_order_goods`
--

DROP TABLE IF EXISTS `litemall_order_goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `litemall_order_goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL DEFAULT '0' COMMENT '订单表的订单ID',
  `goods_id` int(11) NOT NULL DEFAULT '0' COMMENT '商品表的商品ID',
  `goods_name` varchar(127) NOT NULL DEFAULT '' COMMENT '商品名称',
  `goods_sn` varchar(63) NOT NULL DEFAULT '' COMMENT '商品编号',
  `product_id` int(11) NOT NULL DEFAULT '0' COMMENT '商品货品表的货品ID',
  `number` smallint(5) NOT NULL DEFAULT '0' COMMENT '商品货品的购买数量',
  `price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '商品货品的售价',
  `specifications` varchar(1023) NOT NULL COMMENT '商品货品的规格列表',
  `pic_url` varchar(255) NOT NULL DEFAULT '' COMMENT '商品货品图片或者商品图片',
  `comment` int(11) DEFAULT '0' COMMENT '订单商品评论，如果是-1，则超期不能评价；如果是0，则可以评价；如果其他值，则是comment表里面的评论ID。',
  `add_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted` tinyint(1) DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `goods_id` (`goods_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COMMENT='订单商品表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `litemall_order_goods`
--

LOCK TABLES `litemall_order_goods` WRITE;
/*!40000 ALTER TABLE `litemall_order_goods` DISABLE KEYS */;
INSERT INTO `litemall_order_goods` VALUES (1,1,1045000,'绿茶蛋黄酥 200克/4枚入','1045000',58,1,28.00,'[\"标准\"]','http://yanxuan.nosdn.127.net/b2adc3fd9b84a289a1be03e8ee400e61.png',0,'2019-11-28 06:48:11','2019-11-28 06:48:11',0),(2,2,1045000,'绿茶蛋黄酥 200克/4枚入','1045000',58,1,28.00,'[\"标准\"]','https://i.ibb.co/C1LLsHT/5.jpg',0,'2019-11-28 06:48:37','2019-11-28 06:48:37',0),(3,3,1045000,'绿茶蛋黄酥 200克/4枚入','1045000',58,1,28.00,'[\"标准\"]','https://i.ibb.co/C1LLsHT/5.jpg',0,'2019-11-28 06:50:02','2019-11-28 06:50:02',0),(4,4,1045000,'绿茶蛋黄酥 200克/4枚入','1045000',58,1,28.00,'[\"标准\"]','https://i.ibb.co/C1LLsHT/5.jpg',0,'2019-11-28 07:09:06','2019-11-28 07:09:06',0),(5,5,1045000,'绿茶蛋黄酥 200克/4枚入','1045000',251,1,48.00,'[\"标准\"]','https://i.ibb.co/C1LLsHT/5.jpg',0,'2019-11-28 07:18:49','2019-11-28 07:18:49',0),(6,6,1045000,'绿茶蛋黄酥 200克/4枚入','1045000',251,1,48.00,'[\"标准\"]','https://i.ibb.co/C1LLsHT/5.jpg',0,'2019-11-28 07:25:05','2019-11-28 07:25:05',0),(7,7,1045000,'绿茶蛋黄酥 200克/4枚入','1045000',252,1,0.01,'[\"标准\"]','https://i.ibb.co/C1LLsHT/5.jpg',0,'2019-11-28 07:34:58','2019-11-28 07:34:58',0);
/*!40000 ALTER TABLE `litemall_order_goods` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-28 15:41:58
