const Controller = require('egg').Controller;

class UploadController extends Controller {
  async uploadImg() {
    const { ctx, service, config } = this;
    try {
      const stream = await ctx.getFileStream();
      const res = await service.common.upload.uploadImg(stream);
      ctx.body = ctx.success(res);
    } catch (e) {
      ctx.body = ctx.fail(-1, e);
    }
  }

  async uploadFile() {
    const { ctx, service, config } = this;
    try {
      const stream = await ctx.getFileStream();
      const res = await service.common.upload.uploadFile(stream);
      ctx.body = ctx.success(res);
    } catch (e) {
      ctx.body = ctx.fail(-1, e);
    }
  }
}

module.exports = UploadController;
