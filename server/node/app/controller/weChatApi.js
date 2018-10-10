'use strict';

var Response = require('../util/response.js');

module.exports = app => {
    class weChatApi extends app.Controller {

        * getAppId() {
            try {
                var res = yield this.service.commonLogic.weChatApi.getAppId();
                this.ctx.body = res;
            } catch(e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * getToken() {
            try {
                var res = yield this.service.commonLogic.weChatApi.getToken();
                this.ctx.body = res;
            } catch(e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * getTicket() {
            try {
                var res = yield this.service.commonLogic.weChatApi.getTicket();
                this.ctx.body = res;
            } catch(e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * getSdkInfo() {
            try {
                var res = yield this.service.commonLogic.weChatApi.getSdkInfo(this.ctx.request.body.url);
                this.ctx.body = res;
            } catch(e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * getPrePayId(){
            try {
                var data = this.ctx.request.body;
                var res = yield this.service.commonLogic.weChatApi.getPrePayId(data);
                this.ctx.body = res;
            } catch(e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * getPayNotify(){
            try {
                var data = this.ctx.request.body;
                var res = yield this.service.commonLogic.weChatApi.getPayNotify(data);
                this.ctx.body = res;
            } catch(e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * snsapiBase(){
            try {
                var res = yield this.service.commonLogic.weChatApi.snsapiBase(this.ctx.params.code);
                this.ctx.body = res;
            } catch(e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * snsapiUserInfo(){
            try {
                var res = yield this.service.commonLogic.weChatApi.snsapiUserInfo(this.ctx.params.code);
                this.ctx.body = res;
            } catch(e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * userInfo(){
            try {
                var res = yield this.service.commonLogic.weChatApi.getUserInfo(this.ctx.params.openid);
                this.ctx.body = res;
            } catch(e) {
                this.ctx.body = Response.fail(1, e)
            }
        }
    }
    return weChatApi
};
