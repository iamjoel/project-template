var generatorList = require('../../util/sql/list')
var splitMoreInfo = require('../../util/split-more-info')

const Service = require('egg').Service;

class CommonService extends Service {
  // api/item/list 怎么处理成两个对象呢？
  async list(resourceName, pager = {at: 1} , where, orders) {
    const {app, ctx, config} = this

    // 要显示的字段
    var mainFields = ['id']
                      .concat(require(`../../model/${app.modelMap[resourceName] || resourceName}`).viewFields)
                      .map(item => `${resourceName}.${item}`)

    var subResourceName = 'category'
    var subFields = ['id']
                      .concat(require(`../../model/${app.modelMap[subResourceName] || subResourceName}`).viewFields)
                      .map(item => `${subResourceName}.${item} as ${subResourceName}__${item}`)

    var fields = mainFields.concat(subFields)

    // 列表数据
    var listSql = generatorList({
                    resourceName,
                    pager,
                    where,
                    orders
                  }, this, null, true)
                  .fields(fields)
                  .left_join(subResourceName, null, `${resourceName}.categoryId = ${subResourceName}.id`)
                  .toString()
    console.log(listSql)
    var list = await this.app.mysql.query(listSql)
    list = splitMoreInfo(list, 'category')

    // 总条数
    var countSql = generatorList({
                    resourceName,
                    pager,
                    where,
                    orders
                  }, this, 'count', true)
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
  */
  async detail(resourceName, id) {
    const {app, ctx, config} = this

    // 要显示的字段
    // 要显示的字段
    var mainFields = ['id']
                      .concat(require(`../../model/${app.modelMap[resourceName] || resourceName}`).viewFields)
                      .map(item => `${resourceName}.${item}`)

    var subResourceName = 'category'
    var subFields = ['id']
                      .concat(require(`../../model/${app.modelMap[subResourceName] || subResourceName}`).viewFields)
                      .map(item => `${subResourceName}.${item} as ${subResourceName}__${item}`)

    var fields = mainFields.concat(subFields)

    var sql = app.squel.select()
            .from(resourceName)
            .left_join(subResourceName, null, `${resourceName}.categoryId = ${subResourceName}.id`)
            .fields(fields)
            .where(`${resourceName}.id = "${id}"`)
            .toString()
    console.log(sql)

    var res = await this.app.mysql.query(sql)
    res = splitMoreInfo(res, 'category')

    return {
      data: res
    }
  }

}

module.exports = CommonService
