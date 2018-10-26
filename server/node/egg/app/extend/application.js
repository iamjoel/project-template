'use strict';
// 载入别名
require('module-alias/register');
const squel = require('squel').useFlavour('mysql');
const modelMap = require('@root/config/model-map');

module.exports = {
  squel,
  modelMap,
};
