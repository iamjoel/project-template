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
    at = at ? parseInt(at) : 1
    limit = limit || config.PAGE_LIMIT
    const offset = (at - 1) * limit

    let whereStr = generatorWhere(where, ctx.helper.escape)

    orders.push(['updateTime', 'desc'])

    // 列表数据
    var listSql = generatorOrder(
                app.squel.select()
                  .from(`demo_${resourceName}`)
                  .where(whereStr)
                  .offset(offset)
                  .limit(limit),
                orders
              ).toString()
    console.log(listSql)
    const list = await this.app.mysql.query(listSql)

    // 总条数
    var countSql = generatorOrder(
                app.squel.select()
                  .from(`demo_${resourceName}`)
                  .field('count(id)', 'total')
                  .where(whereStr),
                orders
              ).toString()
    console.log(countSql)
    const total = await this.app.mysql.query(countSql)

    return {
      data: list,
      pager: {
        total: total[0].total,
        pageAt: at
      }
    }
  }


  async listORM(resourceName) {
    const list = await this.app.mysql.query(`select * from demo_${resourceName}`)
    return list
  }
}

module.exports = CommonService