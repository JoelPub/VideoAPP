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
-- Table structure for table `litemall_goods`
--

DROP TABLE IF EXISTS `litemall_goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `litemall_goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goods_sn` varchar(63) NOT NULL DEFAULT '' COMMENT '商品编号',
  `name` varchar(127) NOT NULL DEFAULT '' COMMENT '商品名称',
  `category_id` int(11) DEFAULT '0' COMMENT '商品所属类目ID',
  `brand_id` int(11) DEFAULT '0',
  `gallery` varchar(1023) DEFAULT NULL COMMENT '商品宣传图片列表，采用JSON数组格式',
  `keywords` varchar(255) DEFAULT '' COMMENT '商品关键字，采用逗号间隔',
  `brief` varchar(255) DEFAULT '' COMMENT '商品简介',
  `is_on_sale` tinyint(1) DEFAULT '1' COMMENT '是否上架',
  `sort_order` smallint(4) DEFAULT '100',
  `pic_url` varchar(255) DEFAULT NULL COMMENT '商品页面商品图片',
  `share_url` varchar(255) DEFAULT NULL COMMENT '商品分享朋友圈图片',
  `is_new` tinyint(1) DEFAULT '0' COMMENT '是否新品首发，如果设置则可以在新品首发页面展示',
  `is_hot` tinyint(1) DEFAULT '0' COMMENT '是否人气推荐，如果设置则可以在人气推荐页面展示',
  `unit` varchar(31) DEFAULT '’件‘' COMMENT '商品单位，例如件、盒',
  `counter_price` decimal(10,2) DEFAULT '0.00' COMMENT '专柜价格',
  `retail_price` decimal(10,2) DEFAULT '100000.00' COMMENT '零售价格',
  `detail` text COMMENT '商品详细介绍，是富文本格式',
  `add_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `deleted` tinyint(1) DEFAULT '0' COMMENT '逻辑删除',
  PRIMARY KEY (`id`),
  KEY `goods_sn` (`goods_sn`),
  KEY `cat_id` (`category_id`),
  KEY `brand_id` (`brand_id`),
  KEY `sort_order` (`sort_order`)
) ENGINE=InnoDB AUTO_INCREMENT=1181004 DEFAULT CHARSET=utf8mb4 COMMENT='商品基本信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `litemall_goods`
--

LOCK TABLES `litemall_goods` WRITE;
/*!40000 ALTER TABLE `litemall_goods` DISABLE KEYS */;
INSERT INTO `litemall_goods` VALUES (1045000,'1045000','绿茶蛋黄酥 200克/4枚入',1005012,0,'[\"https://i.ibb.co/hMmrtXR/1.jpg\",\"https://i.ibb.co/sQYFY76/2.jpg\",\"https://i.ibb.co/HqMr5qM/3.jpg\",\"https://i.ibb.co/nr5T7Fd/4.jpg\",\"https://i.ibb.co/C1LLsHT/5.jpg\"]','','香甜茶食，果腹优选',1,7,'https://i.ibb.co/C1LLsHT/5.jpg','',0,0,'件',0.01,0.01,'','2018-02-01 00:00:00','2019-11-28 07:34:33',0),(1070000,'1070000','星云酥 180克/3颗',1008015,0,'[\"https://i.ibb.co/hMmrtXR/1.jpg\",\"https://i.ibb.co/sQYFY76/2.jpg\",\"https://i.ibb.co/HqMr5qM/3.jpg\",\"https://i.ibb.co/nr5T7Fd/4.jpg\",\"https://i.ibb.co/C1LLsHT/5.jpg\"]','','酥饼界的小仙女',1,8,'https://i.ibb.co/C1LLsHT/5.jpg','',0,0,'件',46.00,26.00,'','2018-02-01 00:00:00','2018-02-01 00:00:00',0),(1111007,'1111007','妙曲奇遇记曲奇礼盒 520克',1008015,0,'[\"https://i.ibb.co/hMmrtXR/1.jpg\",\"https://i.ibb.co/sQYFY76/2.jpg\",\"https://i.ibb.co/HqMr5qM/3.jpg\",\"https://i.ibb.co/nr5T7Fd/4.jpg\",\"https://i.ibb.co/C1LLsHT/5.jpg\"]','','六种口味，酥香脆爽',1,4,'https://i.ibb.co/C1LLsHT/5.jpg','',0,0,'件',98.00,78.00,'','2018-02-01 00:00:00','2018-02-01 00:00:00',0),(1116011,'1116011','蔓越莓曲奇 200克',1008015,0,'[\"https://i.ibb.co/hMmrtXR/1.jpg\",\"https://i.ibb.co/sQYFY76/2.jpg\",\"https://i.ibb.co/HqMr5qM/3.jpg\",\"https://i.ibb.co/nr5T7Fd/4.jpg\",\"https://i.ibb.co/C1LLsHT/5.jpg\"]','','酥脆奶香，甜酸回味',1,5,'https://i.ibb.co/C1LLsHT/5.jpg','',1,1,'件',56.00,36.00,'','2018-02-01 00:00:00','2018-02-01 00:00:00',0),(1134036,'1134036','凤梨酥 360克',1008015,0,'[\"https://i.ibb.co/hMmrtXR/1.jpg\",\"https://i.ibb.co/sQYFY76/2.jpg\",\"https://i.ibb.co/HqMr5qM/3.jpg\",\"https://i.ibb.co/nr5T7Fd/4.jpg\",\"https://i.ibb.co/C1LLsHT/5.jpg\"]','','特别添加10%凤梨果肉',1,9,'https://i.ibb.co/C1LLsHT/5.jpg','',0,1,'件',58.00,38.00,'','2018-02-01 00:00:00','2018-02-01 00:00:00',0),(1143018,'1143018','粽情乡思端午粽礼盒 640克',1008015,0,'[\"https://i.ibb.co/hMmrtXR/1.jpg\",\"https://i.ibb.co/sQYFY76/2.jpg\",\"https://i.ibb.co/HqMr5qM/3.jpg\",\"https://i.ibb.co/nr5T7Fd/4.jpg\",\"https://i.ibb.co/C1LLsHT/5.jpg\"]','','五种口味，寄情端午',1,1,'https://i.ibb.co/C1LLsHT/5.jpg','',0,0,'件',88.00,68.00,'','2018-02-01 00:00:00','2018-02-01 00:00:00',0),(1143019,'1143019','粽夏冰晶端午粽礼盒 480克',1008015,0,'[\"https://i.ibb.co/hMmrtXR/1.jpg\",\"https://i.ibb.co/sQYFY76/2.jpg\",\"https://i.ibb.co/HqMr5qM/3.jpg\",\"https://i.ibb.co/nr5T7Fd/4.jpg\",\"https://i.ibb.co/C1LLsHT/5.jpg\"]','','五味冰粽，清凉一夏',1,2,'https://i.ibb.co/C1LLsHT/5.jpg','',0,0,'件',118.00,98.00,'','2018-02-01 00:00:00','2018-02-01 00:00:00',0),(1143020,'1143020','粽横四海端午粽礼盒 800克',1008015,0,'[\"https://i.ibb.co/hMmrtXR/1.jpg\",\"https://i.ibb.co/sQYFY76/2.jpg\",\"https://i.ibb.co/HqMr5qM/3.jpg\",\"https://i.ibb.co/nr5T7Fd/4.jpg\",\"https://i.ibb.co/C1LLsHT/5.jpg\"]','','八方风味，粽香礼赞',1,3,'https://i.ibb.co/C1LLsHT/5.jpg','',0,0,'件',188.00,168.00,'','2018-02-01 00:00:00','2018-02-01 00:00:00',0);
/*!40000 ALTER TABLE `litemall_goods` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-28 15:39:51
