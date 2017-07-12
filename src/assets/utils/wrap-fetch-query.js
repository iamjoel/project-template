export default function (url, query, pager) {
  var res = url
  if (query || pager) {
    res += '?'
    var hasQuery = false
    if (query) {
      var queryArr = []
      for (let key in query) {
        if (query.hasOwnProperty(key) && query[key] !== '' && query[key] !== undefined && query[key] !== null) {
          queryArr.push([`where[${key}]`, encodeURIComponent(query[key])].join('='))
          hasQuery = true
        }
      }
      res += (queryArr).join('&')
    }

    if (pager) {
      if (hasQuery) {
        res += '&'
      }
      res += (`page[num]=${pager.current}&`)
      res += (`page[item]=${pager.item || 10}`) // 一页几条
    }
  }
  return res
}
