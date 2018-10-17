var generatorList = require('../../util/sql/list')

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
                      .map(item => `${subResourceName}.${item} as ${subResourceName}_${item}`)

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
    const list = await this.app.mysql.query(listSql)

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

}

module.exports = CommonService
