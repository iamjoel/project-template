// 接口权限
/*
* 从 jwt 中拿 role；调用 areAnyRolesAllowed
*
*/
const whiteRouterList = require('../../config/white-router-list');
const config = require('../../config/config.default.js')({});

let acl = require('acl');
acl = new acl(new acl.memoryBackend());
const aclConfig = require('../../config/acl');
acl.allow(aclConfig); // 设置权限

const jwt = require('jwt-simple');
const tokenTools = require('../util/token.js');

module.exports = app => {
  return async function(ctx, next) {
    const isWhiteRouter = whiteRouterList.filter(item => {
      return ctx.request.path.indexOf(item) >= 0;
    })[0];

    if (isWhiteRouter) { // 公开api，都可以访问
      await next();
    } else {
      const userInfo = tokenTools.getUserInfoByToken(ctx.req.headers.token, config.jwtTokenSecret);
      if (!userInfo) {
        ctx.body = ctx.fail(999);
        return;
      }
      const role = userInfo.role + '';
      const resourceName = ctx.request.path.split('/')[2];
      const action = ctx.request.path.split('/')[3];
      console.log(`${role} ${action} ${resourceName}`);
      if (role == '1') { // 管理员，有所有权限
        await next();
      } else {
        const isAllow = await acl.areAnyRolesAllowed(role, resourceName, action);
        if (isAllow) {
          await next();
        } else {
          ctx.body = ctx.fail(3, '没有权限的操作');
        }
      }
    }
  };
};

