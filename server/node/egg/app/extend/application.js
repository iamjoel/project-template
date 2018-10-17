'use strict';
var squel = require("squel").useFlavour('mysql')
var modelMap = require('../../config/model-map')

module.exports = {
  squel,
  modelMap
}
