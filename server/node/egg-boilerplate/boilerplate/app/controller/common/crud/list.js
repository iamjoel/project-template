const getListInfo = require('../../../util/request/get-req-info').getListInfo;
/*
* 列表 的通用处理
*/
module.exports = async (req, handler) => {
  const { ctx, service, config } = req;

  try {
    const { resourceName, pager, where, order } = getListInfo(req);

    handler = handler.bind(req);
    const res = await handler( // 拼 sql
      resourceName,
      pager,
      where,
      order
    );
    ctx.body = ctx.success(res);
  } catch (e) {
    ctx.body = ctx.fail(-1, e);
    ctx.logger.error(e);
  }
};
