/*
* 列表拿通用信息的接口
*/
const generatorWhere = require('./where');
const generatorOrder = require('./order');

module.exports = (info, env, type = 'list', isMulti = false) => {
  let { resourceName, pager, where, orders } = info;
  const { app, ctx, config } = env;


  pager = pager || { at: 1 };
  let { at, limit } = pager;
  at = at ? parseInt(at) : 1;
  limit = limit || config.PAGE_LIMIT;
  const offset = (at - 1) * limit;

  where = where || {};
  const whereStr = generatorWhere(where, ctx.helper.escape, resourceName);

  orders = orders || [];
  if (!isMulti) {
    orders.push([ 'updateTime', 'desc' ]);
  }

  let sql = generatorOrder(
    app.squel.select()
      .from(resourceName)
      .where(whereStr)
      .offset(offset)
      .limit(limit),
    orders
  );
  if (type === 'count') {
    sql = sql.field('count(id)', 'total');
  }
  return sql;
};