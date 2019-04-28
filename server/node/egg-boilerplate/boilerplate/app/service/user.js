const Service = require('egg').Service;

class MainService extends Service {
  async detail(id) {
    const { app, ctx, config } = this;

    // 要显示的字段

    const sql = app.squel.select()
      .from(resourceName)
      .fields(['name'])
      .where(`id = "${id}"`)
      .toString();

    const res = await this.app.mysql.query(sql);
    return {
      data: res,
    };
  }
}

module.exports = MainService;
