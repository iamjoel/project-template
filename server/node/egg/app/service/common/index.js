const generatorList = require('../../util/sql/list');
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
  async list(resourceName, pager = { at: 1 }, where, orders) {
    const { app, ctx, config } = this;

    // 要显示的字段
    const fields = this.ctx.helper.getFields(app, resourceName);

    // 列表数据
    const listSql = generatorList({
      resourceName,
      pager,
      where,
      orders,
    }, this)
      .fields(fields)
      .toString();
    console.log(listSql);
    const list = await this.app.mysql.query(listSql);

    // 总条数
    const countSql = generatorList({
      resourceName,
      pager,
      where,
      orders,
    }, this, 'count')
      .toString();
    console.log(countSql);
    const total = await this.app.mysql.query(countSql);

    return {
      data: list,
      pager: {
        total: total[0].total,
        pageAt: pager.at,
      },
    };
  }

  /*
  * 详情
  * /api/resourceName/detail/1
  */
  async detail(resourceName, id) {
    const { app, ctx, config } = this;

    // 要显示的字段
    const fields = this.ctx.helper.getFields(app, resourceName);

    const sql = app.squel.select()
      .from(resourceName)
      .fields(fields)
      .where(`id = "${id}"`)
      .toString();
    console.log(sql);

    const res = await this.app.mysql.query(sql);
    return {
      data: res,
    };
  }

  /*
  * 新增
  * /api/resourceName/add  data
  */
  async add(resourceName, data) {
    const { app, ctx, config } = this;
    const helper = ctx.helper;

    const checkRes = helper.checkFields(app, resourceName, data, 'add');
    if (checkRes === true) {
      const id = data.id || helper.uuid();
      const insertData = Object.assign({}, data, {
        id,
        delFlg: 0,
        createTime: app.mysql.literals.now,
        updateTime: app.mysql.literals.now,
      });

      await this.app.mysql.insert(resourceName, insertData);
      return {
        data: {
          id,
        },
      };
    }
    // 验证报错
    return {
      errMsg: checkRes,
    };


  }

  /*
  * 编辑
  * /api/resourceName/edit  data
  */
  async edit(resourceName, data) {
    const { app, ctx, config } = this;
    const helper = ctx.helper;

    const checkRes = helper.checkFields(app, resourceName, data, 'edit');
    if (checkRes === true) {
      const insertData = Object.assign({}, data, {
        updateTime: app.mysql.literals.now,
      });

      await this.app.mysql.update(resourceName, insertData);
      return {
        data: {
          id: data.id,
        },
      };
    }
    // 验证报错
    return {
      errMsg: checkRes,
    };

  }

  /*
  * 删除
  * /api/resourceName/del/:id
  */
  async del(resourceName, id) {
    await this.app.mysql.update(resourceName, {
      id,
      delFlg: 1,
      updateTime: this.app.mysql.literals.now,
    });

    return { id };
  }
}

module.exports = CommonService;
