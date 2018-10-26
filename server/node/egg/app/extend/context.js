'use strict';
const Response = require('@/controller/common/response-format');

module.exports = {
  success: Response.success,
  fail: Response.fail,
  handleList: require('@/controller/common/crud/list'),
  handleDetail: require('@/controller/common/crud/detail'),
};
