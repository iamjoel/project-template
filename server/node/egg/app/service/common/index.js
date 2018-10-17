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

    // 要显示的字段
    var fields = ['id'].concat(require(`../../model/${app.modelMap[resourceName] || resourceName}`).viewFields)

    var {at, limit} = pager
    at = at ? parseInt(at) : 1
    limit = limit || config.PAGE_LIMIT
    const offset = (at - 1) * limit

    let whereStr = generatorWhere(where, ctx.helper.escape)

    orders.push(['updateTime', 'desc'])

    // 列表数据
    var listSql = generatorOrder(
                app.squel.select()
                  .from(`${resourceName}`)
                  .fields(fields)
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
                  .from(resourceName)
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

  /*
  * 详情
  * /api/resourceName/detail/1
  */
  async detail(resourceName, id) {
    const {app, ctx, config} = this

    // 要显示的字段
    var fields = ['id'].concat(require(`../../model/${app.modelMap[resourceName] || resourceName}`).viewFields)

    var sql = app.squel.select()
            .from(resourceName)
            .fields(fields)
            .where(`id = "${id}"`)
            .toString()
    console.log(sql)

    var res = await this.app.mysql.query(sql)
    return {
      data: res
    }
  }
  
}

module.exports = CommonService