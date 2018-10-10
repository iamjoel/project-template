'use strict';

var Response = require('../util/response.js');

module.exports = app => {
    class accountLogin extends app.Controller {
        * login() {
            try {
                var data = this.ctx.request.body;
                var res = yield this.service.accountLogin.login(data);
                if(res.code!=0){
                    res = Response.fail(res.code)
                }
                this.ctx.body = res;
            } catch(e) {
                this.ctx.body = Response.fail(1, e)
            }
        }
    }
    return accountLogin
};
