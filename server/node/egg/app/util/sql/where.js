var squel = require("squel")
var squelMysql = squel.useFlavour('mysql')

module.exports = function (searchCondition = {delFlg: 0}, escape) {
  var res = squelMysql.expr()

  searchCondition.delFlg = 0 // 未被删除的
  
  for(var key in searchCondition) {
    // 过滤 XSS 字符
    let value = escape(searchCondition[key])
    if(typeof value === 'string') {
      value = `"${value}"`
    }

    if(!key.includes('__')) {
      res = res.and(`${key} = ${value}`)
    } else { // like, < , > 的操作
      var [rawKey, action] = key.split('__')
      res = res.and(`${rawKey} ${action} ${value}`)
    }
  }

  return res.toString()
}