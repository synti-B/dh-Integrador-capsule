-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: capsulecorp_db
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `order_status`
--

DROP TABLE IF EXISTS `order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status`
--

LOCK TABLES `order_status` WRITE;
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `shoppingcart_id` int DEFAULT NULL,
  `total_price` int NOT NULL,
  `orderstatus_id` int DEFAULT NULL,
  `paystatus_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_6e56abb8-58b5-441c-8150-dd74e6c8f55f` (`paystatus_id`),
  KEY `FK_7baefd14-dc86-47ff-a1b8-8e20bbb69784` (`user_id`),
  KEY `FK_0a477da7-7b8a-4552-989c-58a6e6336dce` (`shoppingcart_id`),
  KEY `FK_9ec62171-b16c-40e8-9234-3e270beec9e4` (`orderstatus_id`),
  CONSTRAINT `FK_0a477da7-7b8a-4552-989c-58a6e6336dce` FOREIGN KEY (`shoppingcart_id`) REFERENCES `shopping_carts` (`id`),
  CONSTRAINT `FK_6e56abb8-58b5-441c-8150-dd74e6c8f55f` FOREIGN KEY (`paystatus_id`) REFERENCES `payment_status` (`id`),
  CONSTRAINT `FK_7baefd14-dc86-47ff-a1b8-8e20bbb69784` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_9ec62171-b16c-40e8-9234-3e270beec9e4` FOREIGN KEY (`orderstatus_id`) REFERENCES `order_status` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_status`
--

DROP TABLE IF EXISTS `payment_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `pay_status` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a7e9a7fd-e28a-40b3-bc31-3cda21896dff` (`user_id`),
  CONSTRAINT `FK_a7e9a7fd-e28a-40b3-bc31-3cda21896dff` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_status`
--

LOCK TABLES `payment_status` WRITE;
/*!40000 ALTER TABLE `payment_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(100) NOT NULL,
  `stock` int NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `discount` int NOT NULL,
  `category_id` int NOT NULL,
  `color_id` int NOT NULL,
  `brand_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_153be0e6-aa5b-45bc-924a-46a78c1ba8b6` (`category_id`),
  KEY `FK_9e750f3f-7f85-4aa1-9d68-4c0e7b1d9752` (`color_id`),
  KEY `FK_2eada349-0ebe-43fb-9627-f757302c6ee4` (`brand_id`),
  CONSTRAINT `FK_153be0e6-aa5b-45bc-924a-46a78c1ba8b6` FOREIGN KEY (`category_id`) REFERENCES `products_categories` (`id`),
  CONSTRAINT `FK_2eada349-0ebe-43fb-9627-f757302c6ee4` FOREIGN KEY (`brand_id`) REFERENCES `products_brands` (`id`),
  CONSTRAINT `FK_9e750f3f-7f85-4aa1-9d68-4c0e7b1d9752` FOREIGN KEY (`color_id`) REFERENCES `products_colors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Reloj Digital Despertador','Nombre del diseño: Reloj Minimalista Tecnología: Digital Conectividad: USB Tipos de alimentación: Usb a cargador de celular Características adicionales: Exhibe fecha Materiales: Plástico Ancho: 8 cm Largo: 23 cm.Despertador','1651010026331--D_NQ_NP_980527-MLM29897517243_042019-O.jpg',15,4000,10,6,7,36,'2022-04-26 21:53:46','2022-04-26 21:53:46'),(2,'Pc Gamer Intel I5','Monitor Samsung 22\" IPS Full Hd LF22T350FHL - Gabinete Gamer RGB LED Aerocool Bolt - Placa de video Msi Ge Force GTX1050Ti OC 4GB GDDR5 - Fuente Aerocool Cylon 500W RGB con 80 Plus Bronze - Placa Madre Gigabyte B560M-DS3H - 16GB de memoria RAM Corsair DDR4 2666MHz - 240GB SSD disco de estado sólido - Windows 10 64 Bits Trial (30 días de prueba) Disco y memoria: marca según disponibilidad','1651010123958--D_NQ_NP_710504-MLA31021996993_062019-W.jpg',8,250000,5,3,4,17,'2022-04-26 21:55:23','2022-04-26 21:55:23'),(3,'Pc Escritorio Gamer Amd Ryzen','Monitor Samsung Led 22\" IPS Full HD LF22T350FHL - Procesador AMD Ryzen 7 5700g 4,6GHz + Gráficos Radeon Vega 8 - Gabinete Gamer RGB LED Aerocool Bolt - Fuente Aerocool Cylon 600W RGB con 80 Plus Bronze - Placa Madre ASUS B550M-K HDMI VGA - 16GB de memoria RAM Corsair Vengeance Dual Channel (2 memorias de 8GB DDR4 3200MHz DIMM) - Disco estado sólido 480GB SSD NVMe PCIe WD Green - Windows 11 64 Bits Trial (30 días de prueba)','1651010217749--D_NQ_NP_699486-MLA48690668442_122021-W.jpg',15,190000,0,3,22,3,'2022-04-26 21:56:57','2022-04-26 21:56:57'),(4,'Impresora a color multifunción HP ','Imprime, escanea y hace copias. Impresión doble faz manual. Tecnología de impresión: inyección de tinta. Tiene entrada USB. Capacidad máxima de 60 hojas. Soporta papel tamaño A4, B5, A6, Sobre DL, Carta, Legal, Personalizado (89 x 127 mm - 215 x 279 mm), 10 x 15 cm. Incluye accesorios. Práctica y funcional tanto para uso personal como profesional','1651010307812--multifuncion-hp-deskjet-advantage-2375.jpg',10,9800,5,4,2,15,'2022-04-26 21:58:27','2022-04-26 21:58:27'),(5,'Impresora Epson ','Impresión doble faz manual. Tecnología de impresión: inyección de tinta. Tiene entrada USB. Capacidad máxima de 150 hojas. Soporta papel tamaño A4, A6, Carta, Ejecutivo, Legal, Media carta, Sobre, Personalizado (89 x 127 mm - 215.9 x 1200 mm), Oficio 9, Sobre N10, Oficio México, Sobre C6, Sobre DL, 16K, Tarjeta Hagaki. Incluye accesorios.','1651010508160--impresora-monocromatica-epson-m1120-sistema-original.jpg',15,48000,10,4,8,37,'2022-04-26 22:01:48','2022-04-26 22:01:48'),(6,'SonSony PlayStation 5yStation 5','Incluye control. Resolución de 3840px x 2160px. Memoria RAM de 16GB. Horas de diversión garantizada. Cuenta con: 1 soporte vertical, 1 cable de alimentación ac, 1 cable usb, 1 cable hdmi, 1 guía de inicio rápido, 1','1651010696627--41xe0HXlgML._AC_SX466_.jpg',5,190000,5,7,7,27,'2022-04-26 22:04:56','2022-04-26 22:04:56'),(7,'Placa Madre Biostar Tb360-btc Pro','Plataforma: Intel Capacidad máxima soportada de la memoria RAM: 16 GB Chipsets: Intel B360 Ranuras de expansión: 12 Con procesador: No CPU: intel LGA 1151 Aplicaciones: mineria crypto Tipo de memoria RAM: DDR4','1651010807378--BiostarTB360BTCPROMiningMotherboard_l.jpg',5,80000,0,5,22,34,'2022-04-26 22:06:47','2022-04-26 22:06:47'),(8,'Placa Madre Asrock H510 ProBtc+  Mineria ','MOTHERBOARD H510 Pro BTC + / 6 PUERTOS PCI / MINADO CRIPTOMONEDAS / 1 SATA3, 1 M.2 (SATA3) / 6 PCIe 3.0 x16, 1 Mining Port (M_Port1 @ x1) / DDR4 3200MHz / Fully Independent Power Rail','1651010900865--D_NQ_NP_834677-MLA47619214298_092021-O.jpg',10,65000,7,5,22,5,'2022-04-26 22:08:20','2022-04-26 22:08:20'),(9,' Placa Madre Asus Prime B450m','Plataforma: AMD Capacidad máxima soportada de la memoria RAM: 32 GB Chipsets: B450 Socket: AM4 Ranuras de expansión: 4 Con procesador: No Aplicaciones: AURA SYNC Tipo de memoria RAM: DDR4','1651010970447--motherboard-asus-prime-b450m-a-ii-usb-3-hdmi-socket-am4.jpg',12,10000,0,5,22,6,'2022-04-26 22:09:30','2022-04-26 22:09:30'),(10,'Disco sólido interno WD Green 240GB','Útil para guardar programas y documentos con su capacidad de 240 GB. Resistente a fuertes golpes. Más espacio en tu PC con su factor de forma M.2 2280. Interfaces de conexión: PCIe Gen 3.0, NVMe, PCIe Gen3x1, PCIe Gen3x2, PCIe Gen2x4, PCIe Gen2x2 y PCIe Gen2x1. Apto para PC.','1651011039144--679395-MLA47856356317_102021-F.jpg',7,6000,5,5,2,31,'2022-04-26 22:10:39','2022-04-26 22:10:39'),(11,'Disco duro interno WD púrpura','Útil para guardar programas y documentos con su capacidad de 1 TB. Tamaño de 3.5 \". Interfaz de conexión: SATA III. Apto para NVR y PC y DVR. Incrementa el rendimiento de tu equipo. Las imágenes pueden ser ilustrativas.','1651011136174--D_NQ_NP_717542-MLA40193501678_122019-O.jpg',15,8000,10,5,16,31,'2022-04-26 22:12:16','2022-04-26 22:12:16'),(12,'Disco duro externo Seagate Expansion 2TB negro','Útil para guardar programas y documentos con su capacidad de 2 TB. Tamaño de 2.5 \". Es compatible con Windows 10, Windows 8, Windows 7. Fácil de transportar. Interfaz de conexión: USB 3.0. Apto para PC y Notebook. Accesorios incluidos: cable usb 3.0, cable usb tipo-c, manual, rescue data recovery services.','1651011671375--D_NQ_NP_950989-MLA40076329712_122019-O.jpg',15,12000,5,5,22,33,'2022-04-26 22:21:11','2022-04-26 22:21:11'),(13,'Velador Lampara Luna Llena ','- Cambia de color de forma tactil - Luz de 7 colores distintos de colores - Fuente de alimentación: USB - Bombilla: LED - Potencia: 0.3 W - Voltaje: DC 5 V - Botón de encendido y apagado - Color: Blanca - Duración de la batería: 3 a 8 horas (según el tiempo de carga) - Medidas: 15 cm. de Diametro - Base de Madera - Incluye Cable Usb de Recarga','1651011749429--D_NQ_NP_876234-MLA28118715471_092018-O.jpg',20,4000,5,6,3,36,'2022-04-26 22:22:29','2022-04-26 22:22:29'),(14,'Auriculares gamer JBL','Con micrófono incorporado. Tipo de conector: Jack 3.5 mm/USB. Sonido superior y sin límites. Cómodos y prácticos.','1651011812904--623876-MLA48699001272_122021-F.jpg',10,18000,10,7,11,35,'2022-04-26 22:23:32','2022-04-26 22:23:32'),(15,'Gabinete Deepcool Matrexx 50','Gabinete Deepcool Matrexx 50 Add-rgb + 4 Coolers Argb.Incluye fuente de alimentación: No Tipo de estructura: Mid tower Puertos: USB 3.0,USB 2.0,Audio HD Bahías: 3.5 in,2.5 in Altura x Ancho x Largo: 479 mm x 210 mm x 442 mm Es gamer: Sí Placas madre compatibles: ATX,Micro-ATX,Mini-ITX,E-ATX','1651011905877--99951604344136B.jpg',8,15000,5,5,10,34,'2022-04-26 22:25:05','2022-04-26 22:25:05'),(16,'Monitor gamer Samsung led 24 ','Pantalla led de 24 \". Tiene una resolución de 1920px-1080px. Relación de aspecto de 16:9. Panel IPS. Su brillo es de 250cd/m². Tipos de conexión: D-Sub, HDMI 1.4.','1651011993102--D_NQ_NP_735145-MLA48131216536_112021-O.jpg',2,37000,5,7,11,26,'2022-04-26 22:26:33','2022-04-26 22:26:33'),(17,'Apple Macbook Air','Capacidad:8 GB RAM | 256 GB SSD Descripción La notebook más delgada y ligera de Apple viene con los superpoderes del chip M1. Termina todos tus proyectos mucho más rápido con el CPU de 8 núcleos y disfruta como nunca antes de apps y juegos con gráficos avanzados gracias al GPU de hasta 8 núcleos. Además, el Neural Engine de 16 núcleos se encarga de acelerar todos los procesos de aprendizaje automático. Todo en un diseño silencioso sin ventilador que te ofrece la mayor duración de batería en una MacBook Air: hasta 18 horas. (1) Portátil como siempre, más poderosa que nunca. color plata, oro , gris','1651012071890--21+2gXvpcCL._AC_SS450_.jpg',3,190000,5,2,5,4,'2022-04-26 22:27:51','2022-04-26 22:27:51'),(18,'Notebook 2 En 1 Hp','NOTEBOOK 2-EN-1 14\" HP PAVILION X360 CONVERTIBLE 14-DW1010WM WINDOWS 10 HOME Intel Core i5 / 8 GB RAM / 256 GB SSD','1651012156391--D_NQ_NP_719940-MLA49378093556_032022-O.jpg',10,125000,5,2,4,15,'2022-04-26 22:29:16','2022-04-26 22:29:16'),(19,'Nintendo Switch 32GB ','Incluye 2 controles. Resolución de 1920px x 1080px. Memoria RAM de 4GB. Tiene pantalla táctil. Horas de diversión garantizada. Cuenta con: 1 joy-con grip, 2 correas para joy-con, 1 dock, 1 cable hdmi, 1 adaptador de corriente..Standard color rojo neón, azul neón y negro','1651012540414--00000HAD-S-KABAA65619HAD-S-KABAA-Consola-Nintendo-Switch-Neon-01.jpg',10,75000,10,7,21,21,'2022-04-26 22:35:40','2022-04-26 22:35:40');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_brands`
--

DROP TABLE IF EXISTS `products_brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_brands`
--

LOCK TABLES `products_brands` WRITE;
/*!40000 ALTER TABLE `products_brands` DISABLE KEYS */;
INSERT INTO `products_brands` VALUES (1,'Acer','1651007307235--acer3 (1).png'),(2,'Adata','1651007383979--adata2.png'),(3,'Amd','1651007401371--amd2.jpg'),(4,'Apple','1651007421064--Apple2.jpg'),(5,'Asrock','1651007462157--asrock2.jpg'),(6,'Asus','1651007478634--asus.png'),(7,'Canon','1651007494097--canon.png'),(8,'Compaq','1651007514966--compaq2.jpg'),(9,'Cooler Master','1651007534838--coolermaster.png'),(10,'Corsair','1651007549431--corsair2.jpg'),(11,'Dell','1651007560829--Dell.png'),(12,'Fujitsu','1651007574490--fujitsu.png'),(13,'Gateway','1651007595215--Gateway.png'),(14,'Geil','1651007609889--Geil.jpg'),(15,'Hp','1651007625178--hp2.jpg'),(16,'IBM','1651007638671--ibm2.jpg'),(17,'Intel','1651007659250--intel2.png'),(18,'Lenovo','1651007675204--lenovo2.png'),(19,'LG','1651007690316--LG2.png'),(20,'Msi','1651007705602--MSI.png'),(21,'Nintendo','1651007722638--nintendo2t.png'),(22,'Nvidia','1651007740082--nvidia3.png'),(23,'Philips','1651007754926--Philips.jpg'),(24,'Play Station','1651007784438--PlayStation_3.jpg'),(25,'Republic Of Gamers','1651007802672--republicofgamers.jpg'),(26,'Samsung','1651007820088--samsung2.jpg'),(27,'Sony','1651007835118--Sony.jpg'),(28,'Toshiba','1651007856152--toshiba.png'),(29,'ViewSonic','1651007873380--viewsonic-home.jpg'),(30,'Viper Gaming','1651007894407--viperGamer.png'),(31,'Western Digital','1651007928913--western-digital2.jpg'),(32,'Xbox','1651007942906--Xbox2.png'),(33,'Zotac','1651007956919--Zotac2.jpg'),(34,'Gigabyte','1651008000309--Gigabyte-GeForce-GTX-1070-Ti-Gam.jpg'),(35,'JBL','1651008013848--2020_06_05_1591326718846_jbl_159.jpg'),(36,'Xiomi','1651008027017--569954632_176909725_1024x576.webp'),(37,'Epson','1651010444370--descarga.png');
/*!40000 ALTER TABLE `products_brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_categories`
--

DROP TABLE IF EXISTS `products_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `image` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_categories`
--

LOCK TABLES `products_categories` WRITE;
/*!40000 ALTER TABLE `products_categories` DISABLE KEYS */;
INSERT INTO `products_categories` VALUES (2,'Notebook','1651008204120--_notebook.png'),(3,'Computadoras','1651008218416--Computaduras.png'),(4,'Impresoras','1651008237062--Copia de arma tu pc.png'),(5,'Arma tu pc','1651008278576--arma tu pc.png'),(6,'Gadget','1651008531460--gadget.png'),(7,'Gamer','1651008548769--gamer.png');
/*!40000 ALTER TABLE `products_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_colors`
--

DROP TABLE IF EXISTS `products_colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_colors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_colors`
--

LOCK TABLES `products_colors` WRITE;
/*!40000 ALTER TABLE `products_colors` DISABLE KEYS */;
INSERT INTO `products_colors` VALUES (1,'Turquesa'),(2,'Verde '),(3,'Beige'),(4,'Plata'),(5,'Oro'),(7,'Blanco'),(8,'Gris'),(9,'Cobre'),(10,'Fluor'),(11,'Azul'),(12,'Celeste'),(13,'Amarillo'),(14,'Marron'),(15,'Naranja'),(16,'Purpura'),(17,'Rojo'),(18,'Rosado'),(19,'Lavanda'),(20,'Arco Iris'),(21,'Mixto'),(22,'Negro');
/*!40000 ALTER TABLE `products_colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_carts`
--

DROP TABLE IF EXISTS `shopping_carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int DEFAULT NULL,
  `quantity_products` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_11b2c8c1-da2b-410d-8107-c136a4b0f222` (`product_id`),
  CONSTRAINT `FK_11b2c8c1-da2b-410d-8107-c136a4b0f222` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_carts`
--

LOCK TABLES `shopping_carts` WRITE;
/*!40000 ALTER TABLE `shopping_carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `shopping_carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `avatar` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `adress` varchar(255) NOT NULL,
  `category_id` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3281fcac-0e1b-4471-8675-ca94a9e338e7` (`category_id`),
  CONSTRAINT `FK_3281fcac-0e1b-4471-8675-ca94a9e338e7` FOREIGN KEY (`category_id`) REFERENCES `users_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,' juan',' juarez','juan@juarez.com','1651006338432_user.png','$2a$10$BvBEQ7ghpkEFxK3NZnqYdelLWaeqcGaeMpE4pHolc30B4Oci.N81y','nose 123',1,'2022-04-26 20:52:18','2022-04-26 20:52:18'),(4,' pepe',' perez','pepe@perez.com','1651006518134_user.png','$2a$10$qoG0fJoRcVkCn6flovmbv.SW4fLCnOrGMeewrfyXWCvH/9vVOMfwK','nose123',2,'2022-04-26 20:55:18','2022-04-26 20:55:18');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_categories`
--

DROP TABLE IF EXISTS `users_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_categories`
--

LOCK TABLES `users_categories` WRITE;
/*!40000 ALTER TABLE `users_categories` DISABLE KEYS */;
INSERT INTO `users_categories` VALUES (1,'comprador'),(2,'adm');
/*!40000 ALTER TABLE `users_categories` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-26 19:36:40
