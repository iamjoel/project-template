const errorMessage = require('../../../config/error-message');

module.exports.fail = function(code, e = null) {
  return {
    errorCode: code,
    errorMessage: e ? (e + '') : ((errorMessage[code] && errorMessage[code].message) || '未知错误'),
  };
};

module.exports.success = function(data) {
  return Object.assign({
    errorCode: 0,
  }, data);
};
