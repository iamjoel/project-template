/*

Target Server Type    : MYSQL
Target Server Version : 50638
File Encoding         : 65001

*/

use `template`;

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for account
-- ----------------------------
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` varchar(36) NOT NULL,
  `account` varchar(40) DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  `password` varchar(400) DEFAULT NULL,
  `role` int(2) DEFAULT NULL,
  `delFlg` int(1) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` varchar(36) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `detail` varchar(400) DEFAULT NULL,
  `delFlg` int(1) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for item
-- ----------------------------
DROP TABLE IF EXISTS `item`;
CREATE TABLE `item` (
  `id` varchar(36) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `detail` varchar(400) DEFAULT NULL,
  `img` varchar(1000) DEFAULT NULL,
  `categoryId` varchar(36) DEFAULT NULL,
  `delFlg` int(1) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
