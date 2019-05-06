const tokenTools = require('../util/token.js');
const config = require('../../config/config.default.js')({});

module.exports = app => {
  return async function(ctx, next) {
    // 记录每次的 api 的简化写法
    await next()

    ctx.logger.info(`
params: ${decodeURIComponent((ctx.captures && ctx.captures.length > 0) ? ctx.captures[0] : ctx.request.querystring)}
body: ${decodeURIComponent(JSON.stringify(ctx.request.body))}
    `)
    // var requestTime = new Date();
    // await next();
    // var responseTime = new Date();


    // // api log
    // if(!ctx.request.ctx.URL.pathname.includes('log') && !ctx.request.ctx.URL.pathname.includes('export') ) {
    //     var equip = ctx.query.isAdminEnd == 1 ? 'admin' : 'mobile' // 设备，admin 或者 mobile。
    //     var errMsg = (ctx.response.body && ctx.response.body.errorCode != 0 && ctx.response.body.errorCode !=999 && ctx.response.body.errorCode!=undefined)
    //             ? ctx.response.body.errorMessage.replace('Error:', '').trim() : null
    //     var isError = !!errMsg
    //     const insertData = {
    //         ip: ctx.request.ip,
    //         userAgent: ctx.request.header["user-agent"],
    //         equip,
    //         url: ctx.request.ctx.URL.pathname.replace(/detail\/[0-9|a-z|A-Z|-]+/g, 'detail/'),
    //         params: (ctx.captures && ctx.captures.length > 0) ? ctx.captures[0] : ctx.request.querystring,
    //         method: ctx.request.method,
    //         body: JSON.stringify(ctx.request.body),
    //         response: JSON.stringify(ctx.response.body),
    //         isError,
    //         errMsg,
    //         requestTime: requestTime,
    //         responseTime: responseTime
    //     };

    //     await ctx.service.log.apiLog.add('api_log', insertData)
    // }

    // if(
    //     ctx.request.ctx.URL.pathname.includes('add')
    //     || ctx.request.ctx.URL.pathname.includes('edit')
    //     || ctx.request.ctx.URL.pathname.includes('audit')
    //     || ctx.request.ctx.URL.pathname.includes('del')
    //     // || true
    // ) {
    //   const userInfo = tokenTools.getUserInfoByToken(ctx.req.headers.token, config.jwtTokenSecret);
    //   var pathArr = ctx.request.path.split('/')
    //   var dataId = getDataId(pathArr[3], pathArr, ctx.request.body)
    //   console.log(dataId)
    //   var res = await ctx.service.log.opLog.add('op_log', {
    //     accountId: userInfo.id,
    //     tableName: pathArr[2],
    //     dataId,
    //     action: toAction(pathArr[3]),
    //     params: ctx.request.body ? JSON.stringify(ctx.request.body) : '-',
    //   })

    // }

  };
};


function getDataId(action, pathArr, body) {
  if(action == 'del') {
    return pathArr[4]
  } else {
    return body.id
  }
}
function toAction(type) {
    return {
      add: 1,//'新增'
      edit: 2,
      del: 3,
      audit: 4,
    }[type] || -1
}