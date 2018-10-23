
const Controller = require('egg').Controller
class CommonController extends Controller {
  async list(handler) {
    await this.ctx.handleList(this, this.service.common.index.list)
  }

  async detail() {
    await this.ctx.handleDetail(this, this.service.common.index.list)
  }

  async add() {
    const { ctx, service, config } = this
    try {
      var resourceName = ctx.request.path.split('/')[2]
      var res = await this.service.common.index.add(resourceName, ctx.request.body)
      ctx.body = ctx.success(res)
    }  catch(e) {
      ctx.body = ctx.fail(-1, e)
    }
  }

  async edit() {
    const { ctx, service, config } = this
    try {
      var resourceName = ctx.request.path.split('/')[2]
      var res = await this.service.common.index.edit(resourceName, ctx.request.body)
      ctx.body = ctx.success(res)
    }  catch(e) {
      ctx.body = ctx.fail(-1, e)
    }
  }

  async del() {

  }
}



module.exports = CommonController