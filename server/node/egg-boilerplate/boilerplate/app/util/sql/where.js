const squel = require('squel');
const squelMysql = squel.useFlavour('mysql');

module.exports = function(searchCondition = {}, escape, resourceName) {
  let res = squelMysql.expr();

  searchCondition[`${resourceName}.delFlg`] = 0; // 未被删除的

  for (let key in searchCondition) {
    // 过滤 XSS 字符
    let value = escape(searchCondition[key]);
    if (typeof value === 'string') {
      value = `"${value}"`;
    }

    if(key.indexOf('.') < 0 
        && key.substring(0, key.indexOf('.')) !== resourceName
        && key.indexOf('fullName') < 0) {
      key = `${resourceName}.${key}`;
    }

    if (!key.includes('__')) {
      res = res.and(`${key} = ${value}`);
    } else { // like, < , > 的操作
      let [ rawKey, action ] = key.split('__');
      if(action === 'like'){
        value = `'%${value.replace(/\"/g, '')}%'`;
      } else if(action === 'in') {
        value = '('+value.replace(/\"/g, '').split(',').map(a => a = `'${a}'`).join(',')+')'
      } else if(action === 'lt'){
        action = '<';
      } else if(action === 'lte'){
        action = '<=';
      } else if(action === 'gt'){
        action = '>'
      } else if(action === 'gte'){
        action = '>='
      }
      res = res.and(`${rawKey} ${action} ${value}`);
    }
  }

  return res.toString();
};
