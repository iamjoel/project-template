
const Controller = require('egg').Controller
class CommonController extends Controller {
  async list() {
    const { ctx, service, config } = this
    var query = ctx.query

    var pager
    if(query.pageAt){
      pager = {
        at: ctx.helper.escape(query.pageAt), // 防 XSS
        limit: query.pageLimit ? ctx.helper.escape(query.pageLimit) : config.PAGE_LIMIT
      }
    }

    var where = query.where ? JSON.parse(query.where) : undefined

    var order = query.order ? JSON.parse(query.order) : undefined

    var resourceName = ctx.request.path.split('/')[2]
    
    try {
      ctx.body = await service.common.index.list(
        resourceName,
        pager,
        where,
        order,
      )
    } catch(e) {
      this.ctx.body = e
      this.logger.error(e)
    }
    
  }

  async detail() {

  }

  async add() {

  }

  async edit() {

  }

  async del() {

  }
}

module.exports = CommonController