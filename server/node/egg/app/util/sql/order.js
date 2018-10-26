module.exports = function(sql, orders) {
  let res = sql;
  orders.forEach(order => {
    res = res.order(order[0], order[1] === 'asc');
  });
  return res;
};
