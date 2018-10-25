module.exports = function (sql, orders) {
  var res = sql
  orders.forEach(order => {
    res = res.order(order[0], order[1] === 'asc')
  })
  return res
}