CREATE DATABASE  IF NOT EXISTS `inventory_management` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `inventory_management`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: inventory_management
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `dept_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbvcyx6myaa3c2s4afkeg472w` (`dept_id`),
  CONSTRAINT `FKbvcyx6myaa3c2s4afkeg472w` FOREIGN KEY (`dept_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,NULL,NULL,NULL),(3,NULL,NULL,NULL),(4,'Android for Dummy','484',1),(5,'TailWind for dummy','587',2),(6,'HTML basic','222',1),(7,'Css for all','555',2),(8,'Product Inventory2','50',2),(9,'Inventory Management','150',1),(11,'Controller Management','150',2),(13,'Fan-Air Management','150',2),(14,'Inventory for dummy','450',1),(15,'Product Shipping','471',2);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Graphic Card'),(2,'Hard Disk'),(3,'Motherboard'),(4,'Processor'),(5,'SSD'),(6,'RAM');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cate_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Programing'),(2,'UI/UX');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `customer_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'andmere Ln, Edwalton Village Ward, Nottinghams','+44 1623447200','Amanda Hallock','amanda@gmail.com'),(2,'165 Howard St, Glasgow, Glasgow, G1 4HF','+44 3303636071','Jackie Chan Papson','jackie@gmail.com'),(3,'79 Wells St, London, Greater London, W1T 3QN','+44 1277844437','Shahid MIa','shahid@gmail.com');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_details`
--

DROP TABLE IF EXISTS `delivery_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` double DEFAULT NULL,
  `productid` int DEFAULT NULL,
  `customerid` int DEFAULT NULL,
  `createdate` datetime DEFAULT NULL,
  `deliverydate` datetime DEFAULT NULL,
  `unit_price` double DEFAULT NULL,
  `total_price` double DEFAULT NULL,
  `statusid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `delivery_product_idx` (`productid`),
  KEY `delivery_customer_idx` (`customerid`),
  KEY `delivery_status_idx` (`statusid`),
  CONSTRAINT `delivery_customer` FOREIGN KEY (`customerid`) REFERENCES `customers` (`id`),
  CONSTRAINT `delivery_product` FOREIGN KEY (`productid`) REFERENCES `products` (`id`),
  CONSTRAINT `delivery_status` FOREIGN KEY (`statusid`) REFERENCES `status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_details`
--

LOCK TABLES `delivery_details` WRITE;
/*!40000 ALTER TABLE `delivery_details` DISABLE KEYS */;
INSERT INTO `delivery_details` VALUES (1,3,4,1,'2024-04-19 12:24:19','2024-04-30 00:00:00',4600,13800,1),(2,3,6,1,'2024-04-19 12:25:02','2024-04-19 00:00:00',4600,13800,3),(3,5,2,2,'2024-04-19 15:53:42','2024-04-25 00:00:00',6800,34000,2),(4,3,9,3,'2024-04-19 15:54:37','2024-04-30 00:00:00',2900,8700,4),(5,3,14,3,'2024-04-19 18:35:47','2024-05-01 00:00:00',1600,4800,2);
/*!40000 ALTER TABLE `delivery_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` double DEFAULT NULL,
  `productid` int DEFAULT NULL,
  `unit_price` double DEFAULT NULL,
  `statusid` int DEFAULT NULL,
  `createdate` datetime DEFAULT NULL,
  `total_price` double DEFAULT NULL,
  `vendorid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_vendor_idx` (`vendorid`),
  KEY `order_product_idx` (`productid`),
  KEY `order_status_idx` (`statusid`),
  CONSTRAINT `order_product` FOREIGN KEY (`productid`) REFERENCES `products` (`id`),
  CONSTRAINT `order_status` FOREIGN KEY (`statusid`) REFERENCES `status` (`id`),
  CONSTRAINT `order_vendor` FOREIGN KEY (`vendorid`) REFERENCES `vendors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (1,5,1,5500,2,'2024-04-19 04:20:31',27500,1),(2,5,1,5500,1,'2024-04-19 04:29:04',27500,2),(3,5,4,4000,2,'2024-04-19 04:31:24',20000,1),(4,5,4,4000,1,'2024-04-19 04:36:12',20000,3),(5,5,4,4000,1,'2024-04-19 04:37:34',20000,1),(6,5,4,4000,3,'2024-04-19 11:25:41',20000,4),(7,5,5,4600,1,'2024-04-19 11:27:17',23000,1),(8,5,5,4600,4,'2024-04-19 11:38:30',23000,2),(9,5,6,4600,1,'2024-04-19 12:25:48',23000,1),(10,6,2,6800,2,'2024-04-19 14:35:00',40800,4),(11,5,6,4600,1,'2024-04-19 14:37:54',23000,1),(12,3,6,5600,2,'2024-04-19 14:39:19',16800,2),(13,5,5,4600,4,'2024-04-19 14:43:46',23000,3),(14,10,9,2900,2,'2024-04-19 15:55:03',29000,3),(15,5,14,1600,3,'2024-04-19 18:21:51',8000,4);
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pcode` varchar(45) DEFAULT NULL,
  `pname` varchar(255) DEFAULT NULL,
  `pcate` int DEFAULT NULL,
  `price` double DEFAULT NULL,
  `createdate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_cate_idx` (`pcate`),
  CONSTRAINT `product_cate` FOREIGN KEY (`pcate`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'PMSI','MSI GT 710 2GD3H LP 2GB DDR3 Gaming Graphic Card',1,5500,'2024-04-18 01:59:47'),(2,'PGIG','GIGABYTE GeForce GT 710 2GB Graphics Card',1,6800,'2024-04-18 02:02:31'),(3,'PASUS','Asus Geforce Gt 730 2GB GDDR5 Graphics Card',1,9300,'2024-04-18 02:03:22'),(4,'PSHIB','Toshiba 1TB Sata Laptop Hard Disk',2,4000,'2024-04-18 02:05:54'),(5,'PWEST','Western Digital 1TB Blue Desktop HDD',2,4600,'2024-04-18 02:07:16'),(6,'PSEA','Seagate SkyHawk 1TB Surveillance Hard Drive',2,5600,'2024-04-18 02:08:43'),(9,'PTE','Teutons PLATINUM 256GB 2.5\'\' SATA Internal SSD',5,2900,'2024-04-18 19:17:14'),(13,'PINTEL','Intel Pentium Gold G7400 Alder Lake Processor',4,6999,'2024-04-19 18:08:27'),(14,'PSKILL','G.SKILL Value 4GB DDR3 1600Mhz Desktop RAM',6,1600,'2024-04-19 18:10:43');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Canceled'),(2,'Ordered'),(3,'Received'),(4,'Shipping');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stocks`
--

DROP TABLE IF EXISTS `stocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stocks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` double DEFAULT NULL,
  `productid` int DEFAULT NULL,
  `warehouseid` int DEFAULT NULL,
  `updatedate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `s_idx` (`productid`),
  KEY `stock_warehouse_idx` (`warehouseid`),
  CONSTRAINT `stock_product` FOREIGN KEY (`productid`) REFERENCES `products` (`id`),
  CONSTRAINT `stock_warehouse` FOREIGN KEY (`warehouseid`) REFERENCES `warehouses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stocks`
--

LOCK TABLES `stocks` WRITE;
/*!40000 ALTER TABLE `stocks` DISABLE KEYS */;
INSERT INTO `stocks` VALUES (1,10,1,1,'2024-04-19 04:29:04'),(2,16,2,1,'2024-04-19 15:53:42'),(3,8,3,2,'2024-04-18 21:31:53'),(5,7,4,1,'2024-04-19 12:24:19'),(6,7,5,1,'2024-04-19 14:43:46'),(7,10,6,1,'2024-04-19 14:39:19'),(8,7,9,1,'2024-04-19 15:55:03'),(9,2,14,1,'2024-04-19 18:35:47');
/*!40000 ALTER TABLE `stocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendors`
--

DROP TABLE IF EXISTS `vendors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `cell` varchar(45) DEFAULT NULL,
  `contact_person` varchar(60) DEFAULT NULL,
  `company` varchar(65) DEFAULT NULL,
  `email` varchar(55) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors`
--

LOCK TABLES `vendors` WRITE;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` VALUES (1,'Khagan, Birulia (Ashulia), Savar Dhaka-1341, Bangladesh.','8801955577607','Hanif Haque','Simtex Industries Limited ','info@simtexgroup.com'),(2,'Horindhara, Tannery Road, Hemayetpur, Savar, Dhaka.','01713043259','Md. Firoz Uddin Hawlader','AKH Packaging & Accessories Ltd','firoz@akhfashions.com'),(3,'387 (South), Tejgaon Industrial Area, Dhaka-1208, Bangladesh','880-2-8170592','Mr. A. K. Azad','Ha-meem group','delwar@hameemgroup.com'),(4,'450 Beximco Industrial Park Sarabo, Kashimpur Gazipur Bangladesh','880-2-58611891','Mr. Sohail F. Rahman','Beximco Textile Division Limited','enquiry@beximtex.com'),(5,'Adamjee Court Main Building (5th, 4th, 3rd Floor), 115-120, Motijheel C/A, Dhaka 1000, Bangladesh','(+88 02) 7176207-8','Mr. A. K. Azad','Noman Group','demo@nttml.com');
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warehouses`
--

DROP TABLE IF EXISTS `warehouses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `wname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warehouses`
--

LOCK TABLES `warehouses` WRITE;
/*!40000 ALTER TABLE `warehouses` DISABLE KEYS */;
INSERT INTO `warehouses` VALUES (1,'Dhaka Warehouse'),(2,'Rajshahi Warehouse'),(3,'Chittagong Warehouse');
/*!40000 ALTER TABLE `warehouses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-19 20:51:34
