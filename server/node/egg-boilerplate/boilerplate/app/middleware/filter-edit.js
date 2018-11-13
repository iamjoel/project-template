/*
* 编辑时，过滤掉表中不存在的字段。
*/
const modelMap = require('@root/config/model-map')

module.exports = app => {
  return async function(ctx, next) {

    const action = ctx.request.path.split('/')[3];
    if(action != 'edit'){
        await next();
    } else {
        const resourceName = ctx.request.path.split('/')[2];
        let data = ctx.request.body;
        var resource = require(`@/service/${modelMap[resourceName]}`)
        let fields = [ 'id' ].concat(resource.canEditFields || resource.viewFields);
        for(let name in data){
            if(fields.every(a => a != name)){
                delete data[name]
            }
        }
        await next();
    }
  };
};