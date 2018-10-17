/*
* 将关联表的信息放到 moreInfo 里去
*/
module.exports = (list, joinTableNames) => {
  if(typeof joinTableNames === 'string') {
    joinTableNames = [joinTableNames]
  }

  if(!Array.isArray(list)) {
    return splitItem(item, joinTableNames)
  } else {
    return list.map(item => {
      return splitItem(item, joinTableNames)
    })
  }
  
}

function splitItem(item, joinTableNames) {
  var res = {moreInfo: {}}
    joinTableNames.forEach(name => {
      res.moreInfo[name] = {}
    })

    for(var key in item) {
      let value = item[key]
      if(key.includes('__')) {
        let [joinTableName, splitKey] = key.split('__')
        res.moreInfo[joinTableName][splitKey] = value
      } else {
        res[key] = value
      }
    }

    return res
}