/*
* 详情 的通用处理
*/
module.exports = async (req, handler) => {
  const { ctx, service, config } = req;

  try {
    const resourceName = ctx.request.path.split('/')[2];
    const id = ctx.helper.escape(ctx.params.id);

    handler = handler.bind(req);
    const res = await handler(resourceName, id);

    ctx.body = ctx.success(res);
  } catch (e) {
    ctx.body = ctx.fail(-1, e);
    ctx.logger.error(e);
  }
};
