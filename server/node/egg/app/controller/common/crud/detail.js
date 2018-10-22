/*
* 详情 的通用处理
*/
module.exports = async (req, handler) => {
  const { ctx, service, config } = req
  
  try {
    var resourceName = ctx.request.path.split('/')[2]
    var id = ctx.helper.escape(ctx.params.id)

    handler = handler.bind(req)
    let res = await handler(resourceName, id)
    
    ctx.body = ctx.success(res)
  } catch(e) {
    ctx.body = ctx.fail(-1, e)
    // logger.error(e)
  }
}