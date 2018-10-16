const Controller = require('egg').Controller
class CommonController extends Controller {
  async list() {
    const { ctx, service } = this
    
    var resourceName = ctx.request.path.split('/')[2]
    ctx.body = await service.common.index.list(resourceName)
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