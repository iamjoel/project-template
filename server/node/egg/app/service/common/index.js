const Service = require('egg').Service;

class CommonService extends Service {
  async list(resourceName, pager = {pageAt: 1, limit: 10} , where, orders) {

    // fileds, join 和 moreInfo,  where
    const {app} = this
    var sql = app.squel.select()
                .from(`demo_${resourceName}`)
                .toString()
    console.log(sql)

    const list = await this.app.mysql.query(sql)
    return list
  }

  async listORM(resourceName) {
    const list = await this.app.mysql.query(`select * from demo_${resourceName}`)
    return list
  }
}

module.exports = CommonService