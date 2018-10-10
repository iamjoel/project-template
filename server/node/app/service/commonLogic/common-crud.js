const Response = require('../../util/response.js');
const Tools = require('../../util/tools.js');
const query = require('../../util/query.js');
const rule = require('../../util/rule.js');
const uuid = require('uuid');
const setting = require('../../conf/setting.js')

module.exports = app => {
  return class ResponseCRUD extends app.Service {

    * detail(resouceName, id) {
      try {
        let detailQuery = ''
        let res = ''
        let checkResult
   
        detailQuery = query.generatorQuery(resouceName, 1, [{id:id}], null, null,'detail')

        if(detailQuery.errorCode!=0){
          return Response.fail(detailQuery.errorCode)
        }else{
          detailQuery = detailQuery.data
        }

        const result = yield app.mysql.query(detailQuery);
        res = query.resultFormat(result[0])

        if(result.length==1){
          //特殊处理
          try{
            checkResult =  yield this.service.businessLogic[Tools.transformStrFormCamel(resouceName)].detailCheck(res);
          }catch(e){
            //无处理逻辑，则直接插入数据
          }

          if(checkResult==undefined){
            res = res
          }else if(checkResult.errorCode == 0){
            res = checkResult.data
          }else{
            return Response.fail(checkResult.errorCode)
          }

          return Response.success({
            data: res
          })
        }else{
          return Response.fail(31)
        }
      } catch(e) {
        return Response.fail(-1,e)
      }
    }

    * list(resouceName, pageAt = 1, where, orders, pageLimit = 10) {
      try {
        let listQuery = ''
        let listCount = ''
        let res = []
        let checkResult
        
        listQuery = query.generatorQuery(resouceName, pageAt, where, orders, pageLimit,'query')
        if(listQuery.errorCode!=0){
          return Response.fail(listQuery.errorCode)
        }else{
          listQuery = listQuery.data
        }
        listCount = query.generatorQuery(resouceName, pageAt, where, orders, pageLimit,'count')
        if(listCount.errorCode!=0){
          return Response.fail(listCount.errorCode)
        }else{
          listCount = listCount.data
        }

        const result = yield app.mysql.query(listQuery);
        const total  = yield app.mysql.query(listCount);

        result.forEach((item)=>{
          res.push(query.resultFormat(item))
        })
  
        //特殊处理
        try{
          checkResult =  yield this.service.businessLogic[Tools.transformStrFormCamel(resouceName)].listCheck(res);
        }catch(e){
          //无处理逻辑，则直接插入数据
        }

        if(checkResult==undefined){
          res = res
        }else if(checkResult.errorCode == 0){
          res = checkResult.data
        }else{
          return Response.fail(checkResult.errorCode)
        }

        return Response.success({
          data: res,
          pager: {
            total:total[0].num,
            pageAt:pageAt
          }
        })
      } catch(e) {
        return Response.fail(-1,e)
      }
    }

    * add(resouceName, data) {
      var checkResult;
      //数据的pk处理
      var id = uuid();
      var tableName = setting.PREFIX + resouceName
      //插入数据的初始化
      //前端生成uuid的情况，后台不生成id
      if(data.id == undefined){
        data.id = id;
      }
      data.delFlg = 0;
      data.createTime = this.app.mysql.literals.now;
      data.updateTime = this.app.mysql.literals.now;

      try {
        //输入值检查
        let ruleResult = rule.check(resouceName,data)
        if(ruleResult.errorCode!=0){
          return Response.fail(ruleResult.errorCode,ruleResult.data)
        }
        
        //事务级插入
        const conn = yield this.app.mysql.beginTransaction();
        try{
          try{
            checkResult =  yield this.service.businessLogic[Tools.transformStrFormCamel(resouceName)].addCheck(data,conn);
          }catch(e){
            //无处理逻辑，则直接插入数据
          }
          
          if(checkResult==undefined||checkResult.errorCode == 0){
            if(checkResult!=undefined&&checkResult.data!=null){
              data = checkResult.data
            }
            const result = yield conn.insert(tableName,data);
            const insertSuccess = result.affectedRows === 1;
            if(insertSuccess){
              yield conn.commit();
              return Response.success({data:{id:data.id}})
            }else{
              yield conn.rollback();
              return Response.fail(40)
            }
          }else{
            yield conn.rollback();
            return Response.fail(checkResult.errorCode,checkResult.data)
          }
        }catch(e){
          yield conn.rollback(); // 一定记得捕获异常后回滚事务！！
          return Response.fail(-1,e)
        }
      } catch(e) {
        return Response.fail(-1,e)
      }
    }

    * edit(resouceName, data) {
      var checkResult;
      var tableName = setting.PREFIX + resouceName
      //获取数据
      const result = yield app.mysql.query(`select * from ${tableName} where id = '${data.id}' and delFlg = 0`);
      //删除null值，更新编辑的数据
      if(result.length != 0){
        var inputData = result[0];
        for(let item in data){
          if(data[item]==null){
            delete inputData[item];
          }else{
            inputData[item] = data[item]
          }
        }
        inputData.updateTime = this.app.mysql.literals.now;

        try {
          let ruleResult = rule.check(resouceName,data)
          if(ruleResult.errorCode!=0){
            return Response.fail(ruleResult.errorCode,ruleResult.data)
          }
          //事务级更新
          const conn = yield this.app.mysql.beginTransaction();
          try{
            try{
              checkResult =  yield this.service.businessLogic[Tools.transformStrFormCamel(resouceName)].editCheck(inputData,conn);
            }catch(e){
              //无处理逻辑，则直接插入数据
            }
  
            if(checkResult==undefined||checkResult.errorCode == 0){
              if(checkResult!=undefined&&checkResult.data!=null){
                inputData = checkResult.data
              }
              const result = yield conn.update(tableName, inputData);
              const updateSuccess = result.affectedRows === 1;
              if(updateSuccess){
                yield conn.commit();
                return Response.success({data:{id:inputData.id}})
              }else{
                yield conn.rollback();
                return Response.fail(50)
              }
            }else{
              yield conn.rollback();
              return Response.fail(checkResult.errorCode,checkResult.data)
            }
          }catch(e){
            yield conn.rollback(); // 一定记得捕获异常后回滚事务！！
            return Response.fail(-1,e)
          }
        }catch(e) {
          return Response.fail(-1,e)
        }
      }else{
        return Response.fail(31)
      }
    }

    * del(resouceName, id) {
      try {
        var checkResult
        var tableName = setting.PREFIX + resouceName
        var data = {
          id: id,
          delFlg:1,
          updateTime:this.app.mysql.literals.now
        };
        //事务级更新
        const conn = yield this.app.mysql.beginTransaction();
        try{
          try{
            checkResult =  yield this.service.businessLogic[Tools.transformStrFormCamel(resouceName)].delCheck(data,conn);
          }catch(e){
            //无处理逻辑，则直接插入数据
          }
          if(checkResult==undefined||checkResult.errorCode == 0){
            const result = yield conn.update(tableName, data);
            const deleteSuccess = result.affectedRows === 1;
            if(deleteSuccess){
              yield conn.commit();
              return Response.success({data:{id:id}})
            }else{
              yield conn.rollback();
              return Response.fail(60)
            }
          }else{
            yield conn.rollback();
            return Response.fail(checkResult.errorCode,checkResult.data)
          }
        }catch(e){
          yield conn.rollback(); // 一定记得捕获异常后回滚事务！！
          return Response.fail(-1,e)
        }  
      } catch(e) {
        return Response.fail(31)
      }
    }
  }
};
