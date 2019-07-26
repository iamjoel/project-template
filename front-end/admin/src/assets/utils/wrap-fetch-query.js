export default function (url, query, pager, order) {
  var res = url
  if (query || pager) {
    res += '?'
    var hasQuery = false
    if (query) {
      let validQuery = {}
      for (let key in query) {
        if (
          query.hasOwnProperty(key) &&
          query[key] !== '' &&
          query[key] !== undefined &&
          query[key] !== null
        ) {
          validQuery[key] =
            typeof query[key] === 'string'
              ? encodeURIComponent(query[key])
              : query[key]
          hasQuery = true
        }
      }
      if (hasQuery) {
        res += 'where=' + encodeURIComponent(JSON.stringify(validQuery))
      }
    }

    if (pager) {
      if (hasQuery) {
        res += '&'
      }
      res += `pageAt=${pager.current}&`
      res += `pageLimit=${pager.item || 10}` // 一页几条
    }

    if (order) {
      res +=
        '&order=' +
        encodeURIComponent(
          JSON.stringify(
            [order] // order 类似 ['name', 'desc或asc']
          )
        )
    }
  }
  return res
}
