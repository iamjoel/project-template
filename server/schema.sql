/*

Target Server Type    : MYSQL
Target Server Version : 50638
File Encoding         : 65001

Date: 2018-05-31 18:15:12
*/

use `admin-template`;

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for demo_category
-- ----------------------------
DROP TABLE IF EXISTS `demo_category`;
CREATE TABLE `demo_category` (
  `id` varchar(36) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `detail` varchar(400) DEFAULT NULL,
  `delFlg` int(1) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for demo_item
-- ----------------------------
DROP TABLE IF EXISTS `demo_item`;
CREATE TABLE `demo_item` (
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
