'use strict';

const setting = require('../conf/setting')
const sql = require('../conf/sql').list
const jwt = require('jwt-simple');
const role = require('../conf/right');
const mysql = require('mysql');

const getResourceName = function(path) {
  return path.split('/')[2];
};
module.exports.getResourceName = getResourceName;

const getOptionName = function(path) {
    return path.split('/')[3];
};
module.exports.getResourceName = getResourceName;

const checkToken = function(token, jwtTokenSecret) {
  if (token) {
    try {
      const decoded = jwt.decode(token, jwtTokenSecret);
      if (decoded.account != null && new Date(decoded.exp) > new Date()) {
        return true;
      }
      return false;

    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
};
module.exports.checkToken = checkToken;

const getUserInfoByToken = function(token, jwtTokenSecret) {
  if (token) {
    try {
      const decoded = jwt.decode(token, jwtTokenSecret);
      return decoded;
    } catch (err) {
      return null;
    }
  } else {
    return null;
  }
};
module.exports.getUserInfoByToken = getUserInfoByToken;

const rightCheck = function(roleType,api) {
    let resourceName = getResourceName(api)
    let option = getOptionName(api)
    let right = role[roleType]
    let hasRight
    let res = {
        code:0,
        message:''
    }
    if(right==undefined){
        res.code = 998
        res.message = '未配置权限文件'
    }else{
        let rightList = role[roleType][resourceName]
        hasRight = rightList.find((v,i,o)=>{
            return v == option
        })
        if(hasRight==undefined){
            res.code = 998
            res.message = `没有权限对资源${resourceName}进行${option}操作`
        }else{
            res.code = 0
        }
    }
    return res    
};
module.exports.rightCheck = rightCheck;

const transformStrFormCamel = function(str) {
  const re = /_(\w)/g;
  return str.replace(re, function($0, $1) {
    return $1.toUpperCase();
  });
};
module.exports.transformStrFormCamel = transformStrFormCamel;

const getParmars = function(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf('?') + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, function(rs, $1, $2) {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
};
module.exports.getParmars = getParmars;

const resultFormat = function(queryData){
  let result = {};
  let list = [];

  for(let item in queryData){
      if(item.indexOf('_')==-1) {
          delete queryData['delFlg'];
          delete queryData['createTime'];
          delete queryData['updateTime'];
          return queryData
      }else{
          let table = item.split('_')[0];
          let key = item.split('_')[1];
          let value = queryData[item];
          let obj ={
              [key]:value
          };
          list.push(table);
          if(result[table]) {
              result[table] = Object.assign(result[table], obj)
          } else {
              result[table] = obj
          }
      }
  }
  list = Array.from(new Set(list));
  result[list[0]].moreInfo = {};
  list.forEach((item)=>{
      if(item!=list[0]){
          result[list[0]].moreInfo = Object.assign({[item]:result[item]},result[list[0]].moreInfo);
          delete result[item];
      }
  });
  result = result[list[0]];
  return result
};
module.exports.resultFormat  = resultFormat;

const tableInfo = function(tableName){
    let table = sql.find((v,i,o)=>{
        if(v.mainTable==tableName){
            return v
        }
    });
    return table
}
const getWhereQuery = function(where,tableInfo){
    let _where = [];
    let res = ''
    let mainTableAs = ''
    if(tableInfo!=undefined){
        mainTableAs = tableInfo.mainTableAs + '.'
    }

    if(where != null){
        for(let i in where){
            let name = i
            let likeFieldlist = setting.likeFieldlist.find((v,i,o)=>{
                if(v == name){
                    return v
                }
            });
            if(likeFieldlist != undefined){
                _where.push(`${mainTableAs}${i} like '%${where[i]}%'`);
            }else{
                if(typeof(where[i])==='string'){
                    _where.push(`${mainTableAs}${i} = '${where[i]}'`);
                }else if(typeof(where[i])==='number'){
                    _where.push(`${mainTableAs}${i} = ${where[i]}`);
                }
            }
        }
        //设置删除flg
        _where.push(`${mainTableAs}delFlg = 0`);
        res =  ` where ${_where.join(' and ')}`;
    }else{
        _where.push(`${mainTableAs}delFlg = 0`);
        res =  ` where ${_where.join(' and ')}`;
    }
    return res
}

const getOrderQuery = function(orders,tableInfo){
    let res = ''
    let mainTableAs =''
    if(tableInfo!=undefined){
        mainTableAs = tableInfo.mainTableAs + '.'
    }
    if(orders != null){
        res = `${res} order by`;
        for(let z=0;z<orders.length;z++){
            res = `${res} ${mainTableAs}${orders[z][0]} ${orders[z][1]} ,`
        }
        res = `${res} ${mainTableAs}updateTime desc `
    }else {
        res = `${res} order by ${mainTableAs}updateTime desc `
    }
    return res
}

const pagination = function(pageAt,pageLimit){
    let res =''
    let limit = pageLimit;
    let offset = (pageAt - 1) * pageLimit;
    pageAt = parseInt(pageAt);
    pageLimit = parseInt(pageLimit);
    res = ` limit ${offset},${limit}`;
    return res
}

const Columnmaker = function(tableInfo){
    let column = []
    tableInfo.mainColumn.split(',').forEach((item)=>{
        column.push(`${tableInfo.mainTableAs}.${item} as ${tableInfo.mainTableAs}_${item}`);
    });
    tableInfo.joinTables.forEach((table)=>{
        table.joinTableColumn.split(',').forEach((item)=>{
            column.push(`${table.joinTableAs}.${item} as ${table.joinTableAs}_${item}`);
        });
    });

    return column
}

const joinMaker = function(tableInfo){
    let res = ''
    tableInfo.joinTables.forEach((table)=>{
        res = res + ` ${table.joinType} ${table.joinTable} as ${table.joinTableAs} on ${tableInfo.mainTableAs}.${table.joinKey[0]} = ${table.joinTableAs}.${table.joinKey[1]}`;
    });
    return res
}

const generatorQuery = function(tableName, pageAt = 1, where, orders, pageLimit = 10,type = 'query'){
    let query = '';
    let _where = [];
    tableName = setting.PREFIX + tableName
    let _tableInfo = tableInfo(tableName)
    //没有表关联的情况
    if(_tableInfo == undefined){
        //查询list或者详情
        if(type=='query'){
            query = `select * from ${tableName}`
        }else if(type=='count'){
            query = `select count(*) as num from ${tableName}`
        }else if(type=='detail'){
            query = `select * from ${tableName}`
        }
    }else if(_tableInfo != undefined){
        //有表关联的情况
        let column = Columnmaker(_tableInfo)
        if(type=='query'){
            query = `select ${column.join(',')} from ${_tableInfo.mainTable} as ${_tableInfo.mainTableAs}`;
        }else if(type=='count'){
            query = `select count(*) as num from ${_tableInfo.mainTable} as ${_tableInfo.mainTableAs}`;
        }else{
            query = `select ${column.join(',')} from ${_tableInfo.mainTable} as ${_tableInfo.mainTableAs}`;
        }
        query = query + joinMaker(_tableInfo)
    }
    //where条件拼接
    query = query + getWhereQuery(where,_tableInfo)
    if(type=='detail'){
        console.log(query)
        return query
    }
    //order拼接
    query = query + getOrderQuery(orders,_tableInfo)
    //分页
    if(type!='count'){
        query = query + pagination(pageAt,pageLimit)
    }
    console.log(query)
    return query
};
module.exports.generatorQuery  = generatorQuery;

const generatorRule = function(rule) {
    let res = {};
    rule.forEach((item) => {
        let type =''
        let name = item[0]
        let dataType = item[1];
        let length = item[2]
        let max = 0;
        let required = item[3];
        let allowEmpty = item[4];

        if(dataType==='varchar'){
            type = 'string';
            max = length;
        }else if(dataType ==='int'){
            type = 'int';
            max = Math.pow(10,length) - 1
        }else if(dataType ==='decimal'){
            type = 'number'
        }
        res[name] = {
            type: type,
            required:required
        };
        if(max) {
            res[name] = Object.assign(res[name], max)
        }
        //允许空字符串
        if(dataType==='varchar'){
            res[name] = Object.assign({allowEmpty:allowEmpty},res[name])
        }
    });
    console.log(res)
    return res
};
module.exports.generatorRule  = generatorRule;

const logicResult = function(code,data){
    return  {
        code:code,
        data:data,
    }
};
module.exports.logicResult  = logicResult;

const sqlInjectionCheck =  function(data){
    let res

    if(typeof data === 'string'){
        res = mysql.escape(data)
        res = res.substring(1,res.length-1)
    }else if(typeof data == 'number'){
        res = parseInt(mysql.escape(data))
    }else if(typeof data === 'object'){
        res = {}
        for(let i in data){
            var v = mysql.escape(data[i])
            v = v.substring(1,v.length-1)
            res = Object.assign({[i]:v},res)
        }
    }else{
        res = data
    }
    return res
}
module.exports.sqlInjectionCheck  = sqlInjectionCheck;

const convertImgCmd = function(path,thumbImgPath,size) {
    return new Promise((resolve, reject)=> {
        var convertImgCmdStr = `convert ${path} -resize ${size} ${thumbImgPath}`;
        exec(convertImgCmdStr, function (err, stdout, srderr) {
            if(err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    })
}
module.exports.convertImgCmd  = convertImgCmd;