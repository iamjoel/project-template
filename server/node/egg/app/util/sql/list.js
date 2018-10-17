/*
* 列表拿通用信息的接口
*/
var generatorWhere = require('./where')
var generatorOrder = require('./order')

module.exports = (info, env, type = 'list') => {
  var {resourceName, pager, where, orders} = info
  const {app, ctx, config} = env


  pager = pager || {at: 1}
  var {at, limit} = pager
  at = at ? parseInt(at) : 1
  limit = limit || config.PAGE_LIMIT
  const offset = (at - 1) * limit

  where = where || {}
  let whereStr = generatorWhere(where, ctx.helper.escape)

  orders = orders || []
  orders.push(['updateTime', 'desc'])

  var sql = generatorOrder(
      app.squel.select()
        .from(resourceName)
        .where(whereStr)
        .offset(offset)
        .limit(limit),
      orders
    )
  if(type === 'count') {
    sql = sql.field('count(id)', 'total')
  }
  return sql
}