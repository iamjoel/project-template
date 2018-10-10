'use strict';

var Response = require('../util/response.js');

module.exports = app => {
    class weChatApi extends app.Controller {

        * getAppId() {
            try {
                var res = yield this.service.weChatApi.getAppId();
                this.ctx.body = res;
            } catch(e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * getToken() {
            try {
                var res = yield this.service.weChatApi.getToken();
                this.ctx.body = res;
            } catch(e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * getTicket() {
            try {
                var res = yield this.service.weChatApi.getTicket();
                this.ctx.body = res;
            } catch(e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * getSdkInfo() {
            try {
                var res = yield this.service.weChatApi.getSdkInfo(this.ctx.request.body.url);
                this.ctx.body = res;
            } catch(e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * getUserInfo(){
            try {
                var res = yield this.service.weChatApi.getUserInfo(this.ctx.params.id);
                this.ctx.body = res;
            } catch(e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * getOpenid(){
            try {
                var res = yield this.service.weChatApi.getUserInfoByOAuth(this.ctx.params.code);
                this.ctx.body = res;
            } catch(e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * getUserInfoByOAuth(){
            try {
                var res = yield this.service.weChatApi.getUserInfoByOAuth(this.ctx.params.code);
                this.ctx.body = res;
            } catch(e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * getPrePayId(){
            try {
                var data = this.ctx.request.body;
                var res = yield this.service.weChatApi.getPrePayId(data);
                this.ctx.body = res;
            } catch(e) {
                this.ctx.body = Response.fail(1, e)
            }
        }

        * getPayNotify(){
            try {
                var data = this.ctx.request.body;
                var res = yield this.service.weChatApi.getPayNotify(data);
                this.ctx.body = res;
            } catch(e) {
                this.ctx.body = Response.fail(1, e)
            }
        }
    }
    return weChatApi
};
