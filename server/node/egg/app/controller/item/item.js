const Controller = require('egg').Controller
class ItemController extends Controller {
  async list() {
    const { ctx, service, config } = this
    var query = ctx.query

    try {
      var resourceName = ctx.request.path.split('/')[2]

      var pager
      if(query.pageAt){
        pager = {
          at: ctx.helper.escape(query.pageAt),
          limit: query.pageLimit ? ctx.helper.escape(query.pageLimit) : config.PAGE_LIMIT
        }
      }

      var where = query.where ? JSON.parse(query.where) : undefined

      var order = query.order ? JSON.parse(query.order) : undefined

      let res = await service.item.item.list( // 拼 sql
        resourceName,
        pager,
        where,
        order,
      )
      ctx.body = ctx.success(res)
    } catch(e) {
      this.ctx.body = ctx.fail(-1, e)
      this.logger.error(e)
    }
  }
}

module.exports = ItemController
