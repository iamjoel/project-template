
const Controller = require('egg').Controller
class CommonController extends Controller {
  async list(handler) {
    await this.ctx.handleList(this, this.service.common.index.list)
  }

  async detail() {
    await this.ctx.handleDetail(this, this.service.common.index.list)
  }

  async add() {
    
  }

  async edit() {

  }

  async del() {

  }
}



module.exports = CommonController