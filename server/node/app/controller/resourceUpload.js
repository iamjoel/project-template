'use strict';

const Response = require('../util/response.js');
const Tools = require('../util/tools.js')

module.exports = app => {
    class resourceUpload extends app.Controller {

        * upload(ctx) {
            try {
                const uploadType = Tools.getResourceName(this.ctx.request.path)
                const res = yield this.service.commonLogic.resourceUpload.resourceUpload(ctx,uploadType);
                this.ctx.body = res;
            } catch (e) {
                this.ctx.body = Response.fail(1, e)
            }
        }
    }
    return resourceUpload
};
