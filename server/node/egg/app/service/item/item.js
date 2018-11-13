const generatorList = require('../../util/sql/list');
const splitMoreInfo = require('../../util/split-more-info');

const Service = require('egg').Service;

class CommonService extends Service {
  async list(resourceName, pager = { at: 1 }, where, orders) {
    const { app, ctx, config } = this;
    const helper = ctx.helper;

    // 要显示的字段
    const mainFields = helper.getFields(app, resourceName, { isJoinTable: true, isMainTable: true });
    const subResourceName = 'category';
    const subFields = helper.getFields(app, subResourceName, { isJoinTable: true, isMainTable: false });
    const fields = mainFields.concat(subFields);

    // 列表数据
    const listSql = generatorList({
      resourceName,
      pager,
      where,
      orders,
    }, this, null, true)
      .fields(fields)
      .left_join(subResourceName, null, `${resourceName}.categoryId = ${subResourceName}.id`)
      .toString();
    console.log(listSql);
    let list = await this.app.mysql.query(listSql);
    list = splitMoreInfo(list, subResourceName);

    // 总条数
    const countSql = generatorList({
      resourceName,
      pager,
      where,
      orders,
    }, this, 'count', true)
      .toString();
    console.log(countSql);
    const total = await this.app.mysql.query(countSql);

    return {
      data: list,
      pager: {
        total: total.length > 0 ? total[0].total : 0,
        pageAt: pager.at,
      },
    };

  }

  /*
  * 详情
  */
  async detail(resourceName, id) {
    const { app, ctx, config } = this;
    const helper = ctx.helper;

    // 要显示的字段
    const mainFields = helper.getFields(app, resourceName, { isJoinTable: true, isMainTable: true });
    const subResourceName = 'category';
    const subFields = helper.getFields(app, subResourceName, { isJoinTable: true, isMainTable: false });

    const fields = mainFields.concat(subFields);

    const sql = app.squel.select()
      .from(resourceName)
      .left_join(subResourceName, null, `${resourceName}.categoryId = ${subResourceName}.id`)
      .fields(fields)
      .where(`${resourceName}.id = "${id}"`)
      .toString();
    console.log(sql);

    let res = await this.app.mysql.query(sql);
    res = splitMoreInfo(res, subResourceName);

    return {
      data: res,
    };
  }

}

module.exports = CommonService;
