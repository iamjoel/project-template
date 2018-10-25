'use strict';

const jwt = require('jwt-simple');
const tokenTools = require('../util/token.js');
const config = require('../../config/config.default.js')({})

module.exports = app => {
  return async function jwtCheck(ctx, next) {
    try {
      if(process.env.NODE_ENV == 'development' && false){
        await next();
      }else{
        const isPassRouter = config.whiteRouterList.filter(item => {
          return ctx.request.path.indexOf(item) >= 0;
        })
        if (ctx.request.path === '/' || isPassRouter.length > 0) {
          await next();
        } else {
          if (ctx.req.headers.token === config.publicApiKey) {
            await next();
          } else {
            if (tokenTools.checkToken(ctx.req.headers.token, config.jwtTokenSecret)) {
              let userInfo = tokenTools.getUserInfoByToken(ctx.req.headers.token,config.jwtTokenSecret);
              if(userInfo.account!=undefined){
                await next();
              }else{
                ctx.body = ctx.fail(999);
              }
            } else {
              ctx.body = ctx.fail(999);
            }
          }
        }
      }
    } catch (e) {
      ctx.body = ctx.fail(-1, e);
    }
  };
};
