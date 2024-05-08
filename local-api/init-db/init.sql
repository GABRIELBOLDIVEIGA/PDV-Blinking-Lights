-- CREATE DATABASE IF NOT EXISTS nestjs_pdv;

CREATE DATABASE  IF NOT EXISTS `nestjs_pdv` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `nestjs_pdv`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: nestjs_pdv
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `categoria_subcategoria`
--

DROP TABLE IF EXISTS `categoria_subcategoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_subcategoria` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `categoriaId` bigint NOT NULL,
  `subCategoriaId` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_778183f0fb71d1156e1ebb35179` (`categoriaId`),
  KEY `FK_ceedeed31de85da49db1f6727fe` (`subCategoriaId`),
  CONSTRAINT `FK_778183f0fb71d1156e1ebb35179` FOREIGN KEY (`categoriaId`) REFERENCES `categorias` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ceedeed31de85da49db1f6727fe` FOREIGN KEY (`subCategoriaId`) REFERENCES `sub_categorias` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_subcategoria`
--

LOCK TABLES `categoria_subcategoria` WRITE;
/*!40000 ALTER TABLE `categoria_subcategoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `categoria_subcategoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `descricao` varchar(255) NOT NULL DEFAULT ' ',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Alimentos','Consumíveis alimentícios','2024-05-08 12:32:03.622111','2024-05-08 12:32:03.622111',NULL);
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente_endereco`
--

DROP TABLE IF EXISTS `cliente_endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente_endereco` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `clienteId` bigint DEFAULT NULL,
  `enderecoId` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_7dbb908274e2576166ed2b396b` (`enderecoId`),
  KEY `FK_2f8909653cafcd9eb9798a457c7` (`clienteId`),
  CONSTRAINT `FK_2f8909653cafcd9eb9798a457c7` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_7dbb908274e2576166ed2b396b4` FOREIGN KEY (`enderecoId`) REFERENCES `enderecos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente_endereco`
--

LOCK TABLES `cliente_endereco` WRITE;
/*!40000 ALTER TABLE `cliente_endereco` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente_endereco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `documento` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `tel1` varchar(255) NOT NULL DEFAULT '',
  `tel2` varchar(255) NOT NULL DEFAULT '',
  `tel3` varchar(255) NOT NULL DEFAULT '',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comanda`
--

DROP TABLE IF EXISTS `comanda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comanda` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `codigo` varchar(36) NOT NULL,
  `forma_pagamento` enum('PIX','DINHEIRO','CARTAO') NOT NULL DEFAULT 'DINHEIRO',
  `status` enum('ABERTO','FECHADO','AGUARDANDO_PAGAMENTO','CANCELADO') NOT NULL DEFAULT 'ABERTO',
  `total` double NOT NULL DEFAULT '0',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `mesaId` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_392d9d126ced48665ee1fecc33` (`codigo`),
  KEY `FK_ac711fa84757219d1d4501e0f8c` (`mesaId`),
  CONSTRAINT `FK_ac711fa84757219d1d4501e0f8c` FOREIGN KEY (`mesaId`) REFERENCES `mesas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comanda`
--

LOCK TABLES `comanda` WRITE;
/*!40000 ALTER TABLE `comanda` DISABLE KEYS */;
/*!40000 ALTER TABLE `comanda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comanda_produtos`
--

DROP TABLE IF EXISTS `comanda_produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comanda_produtos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `comandaId` bigint NOT NULL,
  `produtoId` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_81928cbc78685f08feeee27da50` (`comandaId`),
  KEY `FK_07d33cb49d3003a93aba713701a` (`produtoId`),
  CONSTRAINT `FK_07d33cb49d3003a93aba713701a` FOREIGN KEY (`produtoId`) REFERENCES `produtos` (`id`),
  CONSTRAINT `FK_81928cbc78685f08feeee27da50` FOREIGN KEY (`comandaId`) REFERENCES `comanda` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comanda_produtos`
--

LOCK TABLES `comanda_produtos` WRITE;
/*!40000 ALTER TABLE `comanda_produtos` DISABLE KEYS */;
/*!40000 ALTER TABLE `comanda_produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enderecos`
--

DROP TABLE IF EXISTS `enderecos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enderecos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `cep` varchar(255) NOT NULL DEFAULT '',
  `logradouro` varchar(255) NOT NULL DEFAULT '',
  `complemento` varchar(255) NOT NULL DEFAULT '',
  `bairro` varchar(255) NOT NULL DEFAULT '',
  `localidade` varchar(255) NOT NULL DEFAULT '',
  `uf` varchar(255) NOT NULL DEFAULT '',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enderecos`
--

LOCK TABLES `enderecos` WRITE;
/*!40000 ALTER TABLE `enderecos` DISABLE KEYS */;
/*!40000 ALTER TABLE `enderecos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estoque`
--

DROP TABLE IF EXISTS `estoque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estoque` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `preco_compra` double NOT NULL DEFAULT '0',
  `preco_venda` double NOT NULL DEFAULT '0',
  `quantidade` smallint NOT NULL DEFAULT '0',
  `quantidade_min` smallint NOT NULL DEFAULT '0',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `produtoId` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_fe9e57f225526b5c2e2704174e` (`produtoId`),
  CONSTRAINT `FK_fe9e57f225526b5c2e2704174e6` FOREIGN KEY (`produtoId`) REFERENCES `produtos` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estoque`
--

LOCK TABLES `estoque` WRITE;
/*!40000 ALTER TABLE `estoque` DISABLE KEYS */;
INSERT INTO `estoque` VALUES (1,1,11.11,0,0,'2024-05-08 12:31:18.030625','2024-05-08 12:31:18.030625',NULL,1);
/*!40000 ALTER TABLE `estoque` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estoque_historico`
--

DROP TABLE IF EXISTS `estoque_historico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estoque_historico` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `movimento` enum('ENTRADA','SAIDA','DEFEITO','VENCIDO','DEVOLUCAO') NOT NULL,
  `quantidade` smallint NOT NULL DEFAULT '0',
  `codigo` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `preco_compra` double NOT NULL DEFAULT '0',
  `preco_venda` double NOT NULL DEFAULT '0',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `estoqueId` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4c46b510736da60275f7b1ad53c` (`estoqueId`),
  CONSTRAINT `FK_4c46b510736da60275f7b1ad53c` FOREIGN KEY (`estoqueId`) REFERENCES `estoque` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estoque_historico`
--

LOCK TABLES `estoque_historico` WRITE;
/*!40000 ALTER TABLE `estoque_historico` DISABLE KEYS */;
/*!40000 ALTER TABLE `estoque_historico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forma_de_pagamento`
--

DROP TABLE IF EXISTS `forma_de_pagamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forma_de_pagamento` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forma_de_pagamento`
--

LOCK TABLES `forma_de_pagamento` WRITE;
/*!40000 ALTER TABLE `forma_de_pagamento` DISABLE KEYS */;
/*!40000 ALTER TABLE `forma_de_pagamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fornecedor`
--

DROP TABLE IF EXISTS `fornecedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fornecedor` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `observacoes` varchar(255) NOT NULL DEFAULT '',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fornecedor`
--

LOCK TABLES `fornecedor` WRITE;
/*!40000 ALTER TABLE `fornecedor` DISABLE KEYS */;
INSERT INTO `fornecedor` VALUES (1,'Nome do fornecedor','Pedir desconto.','2024-05-08 12:31:42.424255','2024-05-08 12:31:42.424255',NULL);
/*!40000 ALTER TABLE `fornecedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mesa_comanda`
--

DROP TABLE IF EXISTS `mesa_comanda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mesa_comanda` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `comandaId` bigint NOT NULL,
  `mesaId` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mesa_comanda` (`mesaId`,`comandaId`),
  KEY `FK_68b133004f9e0ecc469532dbb9d` (`comandaId`),
  CONSTRAINT `FK_68b133004f9e0ecc469532dbb9d` FOREIGN KEY (`comandaId`) REFERENCES `comanda` (`id`),
  CONSTRAINT `FK_b9eed07d0cca00504107809d8fc` FOREIGN KEY (`mesaId`) REFERENCES `mesas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesa_comanda`
--

LOCK TABLES `mesa_comanda` WRITE;
/*!40000 ALTER TABLE `mesa_comanda` DISABLE KEYS */;
/*!40000 ALTER TABLE `mesa_comanda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mesas`
--

DROP TABLE IF EXISTS `mesas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mesas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL DEFAULT 'Sem Nome',
  `disponivel` tinyint NOT NULL DEFAULT '0',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `comandaId` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_7acda1efeec181d51c9c5af0eb` (`nome`),
  UNIQUE KEY `comanda-id` (`comandaId`),
  CONSTRAINT `FK_05f66eefd77909b283667a3fe6a` FOREIGN KEY (`comandaId`) REFERENCES `comanda` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesas`
--

LOCK TABLES `mesas` WRITE;
/*!40000 ALTER TABLE `mesas` DISABLE KEYS */;
INSERT INTO `mesas` VALUES (1,'Mesa 1',1,'2024-05-08 12:30:36.191265','2024-05-08 12:30:36.191265',NULL,NULL);
/*!40000 ALTER TABLE `mesas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto_categoria`
--

DROP TABLE IF EXISTS `produto_categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto_categoria` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `produtoId` bigint NOT NULL,
  `categoriaId` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_20bde3e8d0fdd39ea055d887058` (`produtoId`),
  KEY `FK_e73ad9120202a2356a25c2eb50d` (`categoriaId`),
  CONSTRAINT `FK_20bde3e8d0fdd39ea055d887058` FOREIGN KEY (`produtoId`) REFERENCES `produtos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_e73ad9120202a2356a25c2eb50d` FOREIGN KEY (`categoriaId`) REFERENCES `categorias` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto_categoria`
--

LOCK TABLES `produto_categoria` WRITE;
/*!40000 ALTER TABLE `produto_categoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `produto_categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto_fornecedor`
--

DROP TABLE IF EXISTS `produto_fornecedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto_fornecedor` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `produtoId` bigint NOT NULL,
  `fornecedorId` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_4a2352c715ea3839f8459be42f7` (`produtoId`),
  KEY `FK_449baab4fff058a656f2564be3e` (`fornecedorId`),
  CONSTRAINT `FK_449baab4fff058a656f2564be3e` FOREIGN KEY (`fornecedorId`) REFERENCES `fornecedor` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_4a2352c715ea3839f8459be42f7` FOREIGN KEY (`produtoId`) REFERENCES `produtos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto_fornecedor`
--

LOCK TABLES `produto_fornecedor` WRITE;
/*!40000 ALTER TABLE `produto_fornecedor` DISABLE KEYS */;
/*!40000 ALTER TABLE `produto_fornecedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto_subcategoria`
--

DROP TABLE IF EXISTS `produto_subcategoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto_subcategoria` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `produtoId` bigint NOT NULL,
  `subCategoriaId` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_0cd0c655b4f9cbeb0c55b2ce1f9` (`produtoId`),
  KEY `FK_bc454d5053eaa2d24bf673ddcb4` (`subCategoriaId`),
  CONSTRAINT `FK_0cd0c655b4f9cbeb0c55b2ce1f9` FOREIGN KEY (`produtoId`) REFERENCES `produtos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_bc454d5053eaa2d24bf673ddcb4` FOREIGN KEY (`subCategoriaId`) REFERENCES `sub_categorias` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto_subcategoria`
--

LOCK TABLES `produto_subcategoria` WRITE;
/*!40000 ALTER TABLE `produto_subcategoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `produto_subcategoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produtos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `codigo` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `preco_venda` double NOT NULL,
  `preco_compra` double NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_34a50528dbd79d5c6481c932c9` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'A','Produto A','Prod. A',11.11,1,'2024-05-08 12:31:18.018052','2024-05-08 12:31:18.018052',NULL);
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_categorias`
--

DROP TABLE IF EXISTS `sub_categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_categorias` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `descricao` varchar(255) NOT NULL DEFAULT '',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_categorias`
--

LOCK TABLES `sub_categorias` WRITE;
/*!40000 ALTER TABLE `sub_categorias` DISABLE KEYS */;
/*!40000 ALTER TABLE `sub_categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `permissao` enum('DEV','ADMIN','USER') NOT NULL DEFAULT 'USER',
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `enderecoId` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_446adfc18b35418aac32ae0b7b` (`email`),
  UNIQUE KEY `REL_d8a0517a58bb7f4b2d83fe098b` (`enderecoId`),
  CONSTRAINT `FK_d8a0517a58bb7f4b2d83fe098b1` FOREIGN KEY (`enderecoId`) REFERENCES `enderecos` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'DEV','Usuário','email@email.com','$2b$12$MUg/7dG8IEA3iPmOvcZrVeTH42HD8BEscLzQcClxvXgFcsTzl7aT2','2024-05-08 12:27:38.681877','2024-05-08 12:27:38.681877',NULL,NULL),(2,'DEV','Gabriel DEV','gabriel.boldi.dev@gmail.com','$2b$12$S6TMEDHqiYpStMC4Ow4ZF.8ksrjPVsafUVkr3VAWFfmTX5EIUtxHy','2024-05-08 12:30:13.073999','2024-05-08 12:30:13.073999',NULL,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `venda_produto`
--

DROP TABLE IF EXISTS `venda_produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `venda_produto` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `produto_nome` varchar(255) NOT NULL DEFAULT '',
  `produto_descricao` varchar(255) NOT NULL DEFAULT '',
  `produto_preco` double NOT NULL DEFAULT '0',
  `quantidade` smallint NOT NULL DEFAULT '1',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `vendaId` bigint NOT NULL,
  `produtoId` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `prod_venda` (`produtoId`,`vendaId`),
  KEY `FK_aea5a689189fbb39836bd530224` (`vendaId`),
  CONSTRAINT `FK_aea5a689189fbb39836bd530224` FOREIGN KEY (`vendaId`) REFERENCES `vendas` (`id`),
  CONSTRAINT `FK_c80bc8fe6375f1915e6fd2f1a64` FOREIGN KEY (`produtoId`) REFERENCES `produtos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venda_produto`
--

LOCK TABLES `venda_produto` WRITE;
/*!40000 ALTER TABLE `venda_produto` DISABLE KEYS */;
/*!40000 ALTER TABLE `venda_produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendas`
--

DROP TABLE IF EXISTS `vendas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `uuid` varchar(36) NOT NULL,
  `parcelas` smallint NOT NULL DEFAULT '0',
  `observacoes` varchar(255) NOT NULL DEFAULT '',
  `valor_total` double NOT NULL DEFAULT '0',
  `desconto` double NOT NULL DEFAULT '0',
  `valor_pago` double NOT NULL DEFAULT '0',
  `status` enum('FINALIZADA','ABERTO','FIADO','CANCELADA') NOT NULL DEFAULT 'ABERTO',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleted_at` datetime(6) DEFAULT NULL,
  `usuarioId` bigint NOT NULL,
  `clienteId` bigint DEFAULT NULL,
  `mesaId` bigint DEFAULT NULL,
  `formaDePagamentoId` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_07d7ed3713ba362841171c0cba` (`uuid`),
  KEY `FK_6eaa5fc26cdfefbf4b6b10495ef` (`usuarioId`),
  KEY `FK_3f8b029e547e9c594afd836cb45` (`clienteId`),
  KEY `FK_f2faff638f31833659da6b246b9` (`mesaId`),
  KEY `FK_b23b2c18ddc63b557cd767e9add` (`formaDePagamentoId`),
  CONSTRAINT `FK_3f8b029e547e9c594afd836cb45` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`id`),
  CONSTRAINT `FK_6eaa5fc26cdfefbf4b6b10495ef` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `FK_b23b2c18ddc63b557cd767e9add` FOREIGN KEY (`formaDePagamentoId`) REFERENCES `forma_de_pagamento` (`id`),
  CONSTRAINT `FK_f2faff638f31833659da6b246b9` FOREIGN KEY (`mesaId`) REFERENCES `mesas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendas`
--

LOCK TABLES `vendas` WRITE;
/*!40000 ALTER TABLE `vendas` DISABLE KEYS */;
/*!40000 ALTER TABLE `vendas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'nestjs_pdv'
--

--
-- Dumping routines for database 'nestjs_pdv'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-08  9:33:21
