const Service = require('egg').Service;

class CommonService extends Service {
  async list(resourceName) {
    const list = await this.app.mysql.query(`select * from demo_${resourceName}`)
    return list
  }
}

module.exports = CommonService