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
    orders.push([ `${resourceName}.updateTime`, 'desc' ]);
    orders.push([ `${resourceName}.id`, 'desc' ]); // 修复多条数据的更新时间一样时，数据排序是随机的问题。
  }


  let sql = generatorOrder(
    type === 'count' 
    ? app.squel.select()
    .from(resourceName)
    .where(whereStr)
    : app.squel.select()
      .from(resourceName)
      .where(whereStr)
      .offset(offset)
      .limit(limit),
    orders
  );
  if (type === 'count') {
    sql = sql.field(`count(${resourceName}.id)`, 'total');
  }
  return sql;
};
