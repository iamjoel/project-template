const Controller = require('egg').Controller;
class ItemController extends Controller {
  async list() {
    await this.ctx.handleList(this, this.service.item.item.list);
  }

  async detail() {
    await this.ctx.handleDetail(this, this.service.item.item.detail);
  }


}

module.exports = ItemController;
