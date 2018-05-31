'use strict';

var Response = require('../util/response.js');
var Tools = require('../util/tools.js');

module.exports = app => {
  class CommonController extends app.Controller {

    * detail() {
      try {
        var resouceName = Tools.getResourceName(this.ctx.request.path);
        var id = Tools.sqlInjectionCheck(this.ctx.params.id);
        var res = yield this.service.commonCrud.detail(resouceName, id);
        this.ctx.body = res;
      } catch(e) {
        this.ctx.body = Response.fail(1, e)
      }
    }

    * list() {
      try {
        var resouceName = Tools.getResourceName(this.ctx.request.path);
        var query = this.ctx.query;
        var where = query.where ? JSON.parse(query.where) : null;
        where = Tools.sqlInjectionCheck(where)
        var order = query.order ? JSON.parse(query.order) : null;
        var res = yield this.service.commonCrud.list(resouceName,  Tools.sqlInjectionCheck(query.pageAt), where, order, Tools.sqlInjectionCheck(query.pageLimit));
        this.ctx.body = res
      } catch(e) {
        this.ctx.body = Response.fail(1, e)
      }
    }

    * add() {
      try {
        var resouceName = Tools.getResourceName(this.ctx.request.path);
        var data = this.ctx.request.body;
        var res = yield this.service.commonCrud.add(resouceName, data);
        this.ctx.body = res;
      } catch(e) {
        this.ctx.body = Response.fail(1, e);
      }
    }

    * edit() {
      try {
        var resouceName = Tools.getResourceName(this.ctx.request.path);
        var data = this.ctx.request.body;
        var res = yield this.service.commonCrud.edit(resouceName, data);
        this.ctx.body = res;
      } catch(e) {
        this.ctx.body = Response.fail(1, e);
      }
      
    }

    * del() {
      try {
        var resouceName = Tools.getResourceName(this.ctx.request.path);
        var id = this.ctx.params.id;
        var res = yield this.service.commonCrud.del(resouceName, id);
        this.ctx.body = res;
      } catch(e) {
        this.ctx.body = Response.fail(1, e);
      }
    }
  }
  return CommonController
};
