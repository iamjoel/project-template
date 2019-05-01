const errorMessage = require('../../../config/error-message');

module.exports = {
  fail(code, e = null) {
    var errorMessage = e ? (e + '') : ((errorMessage[code] && errorMessage[code].message) || '未知错误')
   this.logger.error(e) // 输出错误堆栈
    return {
      errorCode: code,
      errorMessage
    };
  },
  success(data) {
    return Object.assign({
      errorCode: 0,
    }, data)
  }
}