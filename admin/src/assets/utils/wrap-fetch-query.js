export default function (url, query, pager) {
  var res = url
  if (query || pager) {
    res += '?'
    var hasQuery = false
    if (query) {
      let validQuery = {}
      for (let key in query) {
        if (query.hasOwnProperty(key) && query[key] !== '' && query[key] !== undefined && query[key] !== null) {
          validQuery[key] = encodeURIComponent(query[key])
          hasQuery = true
        }
      }
      if(hasQuery) {
        res += ('where=' + JSON.stringify(validQuery))
      }
    }

    if (pager) {
      if (hasQuery) {
        res += '&'
      }
      res += (`pageAt=${pager.current}&`)
      res += (`pageLimit=${pager.item || 10}`) // 一页几条
    }
  }
  return res
}
