'use strict';

const Response = require('../util/response.js');
const Tools = require('../util/tools.js')

module.exports = app => {
    class specialLogic extends app.Controller {

        * getOrderPrice() {
            try {
                var data = this.ctx.request.body;
                var res = yield this.service.order.getOrderPrice(data);
                if(res.code!=0){
                    res = Response.fail(res.code)
                }
                this.ctx.body = res;
            } catch (e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * emptyWork(){
            try {
                var query = this.ctx.query;
                var where = query.where ? JSON.parse(query.where) : null;
                where = Tools.sqlInjectionCheck(where)
                var res = yield this.service.specialLogic.emptyWork(Tools.sqlInjectionCheck(query.pageAt), where,  Tools.sqlInjectionCheck(query.pageLimit));
                if(res.errorCode!=0){
                    res = Response.fail(res.errorCode)
                }
                this.ctx.body = res;
            } catch (e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * allWorkByOrder(){
            try {
                var data = this.ctx.request.body;
                var res = yield this.service.specialLogic.allWorkByOrder(data);
                if(res.code!=0){
                    res = Response.fail(res.code)
                }
                this.ctx.body = res;
            } catch (e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * workIO(){
            try {
                var data = this.ctx.request.body;
                var res = yield this.service.specialLogic.workIO(data);
                if(res.code!=0){
                    res = Response.fail(res.code)
                }
                this.ctx.body = res;
            } catch (e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * workPlan(){
            try {
                var query = this.ctx.query;
                var res = yield this.service.specialLogic.workPlan(query);
                if(res.code!=0){
                    res = Response.fail(res.code)
                }
                this.ctx.body = res;
            } catch (e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * freeStaff(){
            try {
                var query = this.ctx.query;
                var where = query.where ? JSON.parse(query.where) : null;
                where = Tools.sqlInjectionCheck(where)
                var order = query.order ? JSON.parse(query.order) : null;
                var res = yield this.service.specialLogic.freeStaff(Tools.sqlInjectionCheck(query.pageAt), where, order, Tools.sqlInjectionCheck(query.pageLimit));
                if(res.errorCode!=0){
                    res = Response.fail(res.errorCode)
                }
                this.ctx.body = res;
            } catch (e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * getSmsCode(){
            try {
                var query = this.ctx.query;
                var res = yield this.service.specialLogic.getSmsCode(query);
                if(res.code!=0){
                    res = Response.fail(res.code)
                }
                this.ctx.body = res;
            } catch (e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * mobileRgister(){
            try{
                var data = this.ctx.request.body;
                var res = yield this.service.specialLogic.mobileRgister(data);
                if(res.code!=0){
                    res = Response.fail(res.code)
                }
                this.ctx.body = res;
            } catch (e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * getRank(){
            try {
                var query = this.ctx.query;
                var where = query.where ? JSON.parse(query.where) : null;
                where = Tools.sqlInjectionCheck(where)
                var res = yield this.service.specialLogic.getRank(Tools.sqlInjectionCheck(query.pageAt), where, Tools.sqlInjectionCheck(query.pageLimit));
                if(res.errorCode!=0){
                    res = Response.fail(res.errorCode)
                }
                this.ctx.body = res;
            } catch (e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * rgisterInfoReport(){
            try {
                var res = yield this.service.specialLogic.rgisterInfoReport();
                this.ctx.body = res;
            } catch (e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

    }
    return specialLogic
};
