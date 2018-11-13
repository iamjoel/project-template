var template = `
const Controller = require('egg').Controller;
class MainController extends Controller {
  async list() {
    await this.ctx.handleList(this, this.service.{servicePath}.list);
  }

  async detail() {
    await this.ctx.handleDetail(this, this.service.{servicePath}.detail);
  }

  async add() {
    const { ctx, service, config } = this;
    try {
      const resourceName = ctx.request.path.split('/')[2];
      const res = await this.service.{servicePath}.add(resourceName, ctx.request.body);
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
      const res = await this.service.{servicePath}.edit(resourceName, ctx.request.body);
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
      const res = await this.service.{servicePath}.del(resourceName, ctx.params.id);
      ctx.body = ctx.success(res);
    } catch (e) {
      ctx.body = ctx.fail(-1, e);
    }
  }
}


module.exports = MainController
`
module.exports = template