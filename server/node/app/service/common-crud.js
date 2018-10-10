const Parameter = require('parameter');
const Response = require('../util/response.js');
const Tools = require('../util/tools.js');
const uuid = require('uuid');
const specialSql = require('../conf/sql.js').specialSql;
const setting = require('../conf/setting.js')

module.exports = app => {
  return class ResponseCRUD extends app.Service {

    * detail(resouceName, id) {
      try {
        let detailQuery = ''
        let res = ''
        //特殊sql的查询
        if(specialSql[resouceName].detail!=undefined){
          detailQuery = specialSql[resouceName].detail
        }else{
          detailQuery = Tools.generatorQuery(resouceName, 1, {id:id}, null, null,'detail')
        }
        const result = yield app.mysql.query(detailQuery);

        if(specialSql[resouceName].detail==undefined){
          res = Tools.resultFormat(result[0])
        }else{
          res = result
        }
        if(result.length==1){
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
        //特殊sql的查询
        if(specialSql[resouceName].list!=undefined&&specialSql[resouceName].count!=undefined){
          listQuery = specialSql[resouceName].list
          listCount = specialSql[resouceName].count
          return Response.fail(101)
        }else{
          listQuery = Tools.generatorQuery(resouceName, pageAt, where, orders, pageLimit,'query')
          listCount = Tools.generatorQuery(resouceName, pageAt, where, orders, pageLimit,'count')
        }
        console.log(listQuery)
        
        const result = yield app.mysql.query(listQuery);
        const total  = yield app.mysql.query(listCount);
        if(specialSql[resouceName].list!=undefined&&specialSql[resouceName].count!=undefined){
          res = result
        }else{
          result.forEach((item)=>{
            res.push(Tools.resultFormat(item))
          })
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
      var rule;
      var checkResult;
      //数据的pk处理
      var id = uuid();
      var tableName = setting.PREFIX + resouceName
      //插入数据的初始化
      data.id = id;
      data.delFlg = 0;
      data.createTime = this.app.mysql.literals.now;
      data.updateTime = this.app.mysql.literals.now;

      
      try {
        rule = require(`../rule/${resouceName}.js`).add
      } catch(e) {
        // 找不到验证方法，即不需要验证格式。
      }
      try {
        if(rule) {
          var parameter = new Parameter();
          var errors = parameter.validate(rule, data);
          if(errors) {
            let error = errors[0];
            return Response.fail(100, error)
          }
        }

        try{
          checkResult =  yield this.service[Tools.transformStrFormCamel(resouceName)].addCheck(data);
        }catch(e){
          //无处理逻辑，则直接插入数据
        }
        
        if(checkResult==undefined||checkResult.code == 0){
          if(checkResult!=undefined&&checkResult.data!=null){
            data = checkResult.data
          }
          const result = yield app.mysql.insert(tableName,data);
          const insertSuccess = result.affectedRows === 1;
          return insertSuccess ? Response.success({data:{id:id}}) : Response.fail(40)
        }else{
          return Response.fail(-1,checkResult.data)
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
        var rule;
        try {
          rule = require(`../rule/${resouceName}.js`).edit
        } catch(e) {
          // 找不到验证方法，即不需要验证格式。
        }

        try {
          if(rule) {
            var parameter = new Parameter();
            var errors = parameter.validate(rule, inputData);
            if(errors) {
              let error = errors[0];
              return Response.fail(100, error)
            }
          }
          try{
            checkResult =  yield this.service[Tools.transformStrFormCamel(resouceName)].editCheck(inputData);
          }catch(e){
            //无处理逻辑，则直接插入数据
          }

          if(checkResult==undefined||checkResult.code == 0){
            if(checkResult!=undefined&&checkResult.data!=null){
              inputData = checkResult.data
            }
            const result = yield app.mysql.update(tableName, inputData);
            const insertSuccess = result.affectedRows === 1;
            return insertSuccess ? Response.success({data:{id:inputData.id}}) : Response.fail(40)
          }else{
            return Response.fail(-1,checkResult.data)
          }
        } catch(e) {
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
        try{
          checkResult =  yield this.service[Tools.transformStrFormCamel(resouceName)].delCheck(data);
        }catch(e){
          //无处理逻辑，则直接插入数据
        }
        if(checkResult==undefined||checkResult.code == 0){
          const result = yield app.mysql.update(tableName, data);
          const insertSuccess = result.affectedRows === 1;
          return insertSuccess ? Response.success({data:{id:id}}) : Response.fail(40)
        }else{
          return Response.fail(-1,checkResult.data)
        }
      } catch(e) {
        return Response.fail(31)
      }
    }
  }
};
