'use strict';

const jwt = require('jwt-simple');
const Response = require('../util/response.js');
const Tools = require('../util/tools.js');
const setting = require('../conf/setting.js')

module.exports = app => {
  return async function jwtCheck(ctx, next) {
    try {
      if(process.env.NODE_ENV == 'development'){
        await next();
      }else{
        const isPassRouter = setting.whiteRouterList.filter(item => {
          return ctx.request.path.indexOf(item) >= 0;
        });
        if (ctx.request.path === '/' || isPassRouter.length > 0) {
          await next();
        } else {
          if (ctx.req.headers.token === setting.publicApiKey) {
            await next();
          } else {
            if (Tools.checkToken(ctx.req.headers.token, setting.jwtTokenSecret)) {
              let userInfo = Tools.getUserInfoByToken(ctx.req.headers.token,setting.jwtTokenSecret);
              if(userInfo.account!=undefined){
                await next();
              }else{
                ctx.body = Response.fail(999);
              }
            } else {
              ctx.body = Response.fail(999);
            }
          }
        }
      }
    } catch (e) {
      ctx.body = Response.fail(999);
    }
  };
};
