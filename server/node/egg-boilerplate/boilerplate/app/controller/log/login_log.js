
const Controller = require('egg').Controller;
class MainController extends Controller {
  async list() {
    await this.ctx.handleList(this, this.service.log.loginLog.list);
  }

  async detail() {
    await this.ctx.handleDetail(this, this.service.log.loginLog.detail);
  }

  async add() {
    const { ctx, service, config } = this;
    try {
      const resourceName = ctx.request.path.split('/')[2];
      const res = await this.service.log.loginLog.add(resourceName, ctx.request.body);
      if (res.errMsg) { // 验证报错
        ctx.body = ctx.fail(-2, res.errMsg);
      } else {
        ctx.body = ctx.success(res);
      }
    } catch (e) {
      ctx.body = ctx.fail(-1, e);
    }
  }

  async edit() {
    const { ctx, service, config } = this;
    try {
      const resourceName = ctx.request.path.split('/')[2];
      const res = await this.service.log.loginLog.edit(resourceName, ctx.request.body);
      if (res.errMsg) { // 验证报错
        ctx.body = ctx.fail(-2, res.errMsg);
      } else {
        ctx.body = ctx.success(res);
      }
    } catch (e) {
      ctx.body = ctx.fail(-1, e);
    }
  }

  async del() {
    const { ctx, service, config } = this;
    try {
      const resourceName = ctx.request.path.split('/')[2];
      const res = await this.service.log.loginLog.del(resourceName, ctx.params.id);
      ctx.body = ctx.success(res);
    } catch (e) {
      ctx.body = ctx.fail(-1, e);
    }
  }
}


module.exports = MainController
