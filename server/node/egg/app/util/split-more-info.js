/*
* 将关联表的字段放到 moreInfo 里去。
* 关联表的字段的结构是 "关联表名__表字段名"
*/
module.exports = (list, joinTableNames) => {
  if (typeof joinTableNames === 'string') {
    joinTableNames = [ joinTableNames ];
  }

  if (!Array.isArray(list)) {
    return splitItem(item, joinTableNames);
  }
  return list.map(item => {
    return splitItem(item, joinTableNames);
  });


};

function splitItem(item, joinTableNames) {
  const res = {};

  const moreInfo = {};
  joinTableNames.forEach(name => {
    moreInfo[name] = {};
  });

  for (const key in item) {
    const value = item[key];
    if (key.includes('__')) {
      const [ joinTableName, splitKey ] = key.split('__');
      moreInfo[joinTableName][splitKey] = value;
    } else {
      res[key] = value;
    }
  }

  res.moreInfo = moreInfo;

  return res;
}
