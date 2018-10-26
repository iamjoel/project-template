const Controller = require('egg').Controller;
class MainController extends Controller {
  async login() {
    const { ctx } = this;
    try {
      const res = await this.service.common.login.login(ctx.request.body);
      if (!res.error) {
        ctx.body = ctx.success(res);
      } else {
        ctx.body = ctx.fail(-2, res.error);
      }
    } catch (e) {
      ctx.body = ctx.fail(1, e);
    }
  }
}

module.exports = MainController;
