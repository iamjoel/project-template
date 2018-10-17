var generatorList = require('../../util/sql/list')
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
  async list(resourceName, pager = {at: 1} , where, orders) {
    const {app, ctx, config} = this

    // 要显示的字段
    var fields = ['id'].concat(require(`../../model/${app.modelMap[resourceName] || resourceName}`).viewFields)

    // 列表数据
    var listSql = generatorList({
                    resourceName,
                    pager,
                    where,
                    orders
                  }, this)
                  .fields(fields)
                  .toString()
    console.log(listSql)
    const list = await this.app.mysql.query(listSql)

    // 总条数
    var countSql = generatorList({
                    resourceName,
                    pager,
                    where,
                    orders
                  }, this, 'count')
                  .toString()
    console.log(countSql)
    const total = await this.app.mysql.query(countSql)

    return {
      data: list,
      pager: {
        total: total[0].total,
        pageAt: pager.at
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