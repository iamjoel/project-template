var generatorWhere = require('../../util/sql/where')
var generatorOrder = require('../../util/sql/order')
const Service = require('egg').Service;

/*
* 单表的操作
*/

class CommonService extends Service {
  /*
  * 列表
  /api/resourceName/list?
  where={"name":"t", "detail": "d", "name__like": 3}&
  pageAt=3&pageLimit=6&
  order=[["name", "desc"], ["detail", "asc"]]
  */
  async list(resourceName, pager = {at: 1} , where = {}, orders = []) {
    const {app, ctx, config} = this

    var {at, limit} = pager
    limit = limit || config.PAGE_LIMIT

    let whereStr = generatorWhere(where, ctx.helper.escape)

    const offset = (at - 1) * limit

    var sql = generatorOrder(
                app.squel.select()
                  .from(`demo_${resourceName}`)
                  .where(whereStr)
                  .offset(offset)
                  .limit(limit),
                [...orders, ['updateTime', 'desc']]
              ).toString()
    console.log(sql)

    const list = await this.app.mysql.query(sql)
    return list
  }

  // 分页

  async listORM(resourceName) {
    const list = await this.app.mysql.query(`select * from demo_${resourceName}`)
    return list
  }
}

module.exports = CommonService