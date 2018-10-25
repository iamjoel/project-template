'use strict';
// 载入别名
require('module-alias/register')
var squel = require("squel").useFlavour('mysql')
var modelMap = require('@root/config/model-map')

module.exports = {
  squel,
  modelMap
}
