const squel = require('squel');
const squelMysql = squel.useFlavour('mysql');

module.exports = function(searchCondition = {}, escape, resourceName) {
  let res = squelMysql.expr();

  searchCondition[`${resourceName}.delFlg`] = 0; // 未被删除的

  for (const key in searchCondition) {
    // 过滤 XSS 字符
    let value = escape(searchCondition[key]);
    if (typeof value === 'string') {
      value = `"${value}"`;
    }

    if (!key.includes('__')) {
      res = res.and(`${key} = ${value}`);
    } else { // like, < , > 的操作
      const [ rawKey, action ] = key.split('__');
      res = res.and(`${rawKey} ${action} ${value}`);
    }
  }

  return res.toString();
};
