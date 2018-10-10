'use strict';

const jwt = require('jwt-simple');
const mysql = require('mysql');

const getResourceName = function(path) {
    return path.split('/')[2];
};
module.exports.getResourceName = getResourceName;

const checkToken = function(token, jwtTokenSecret) {
  if(token){
    try{
      const decoded = jwt.decode(token, jwtTokenSecret);
      if (decoded.account != null && new Date(decoded.exp) > new Date()) {
        return true;
      }
      return false;
    }catch (err) {
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
        errorCode:code,
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

const randomString = function (len) {
    len = len || 32;
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var maxPos = chars.length;
    var str = '';
    for (let i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
};
module.exports.randomString  = randomString;

const filterEmoji = function (str){
    var strArr = str.split("");
    var result = "";
    var totalLen = 0;

    for(var i = 0; i < strArr.length; i ++) {
        // 超出长度,退出程序
        if(totalLen >= 16) break;
        var val = strArr[i];
        // 英文,增加长度1
        if(/[a-zA-Z]/.test(val)) {
            totalLen = 1 + (+totalLen);
            result += val;
        }
        // 中文,增加长度2
        else if(/[\u4e00-\u9fa5]/.test(val)) {
            totalLen = 2 + (+totalLen);
            result += val;
        }
        // 遇到代理字符,将其转换为 "", 不增加长度
        else if(/[\ud800-\udfff]/.test(val)) {
            // 代理对长度为2,
            if(/[\ud800-\udfff]/.test(strArr[i + 1])) {
                // 跳过下一个
                i ++;
            }
            // 将代理对替换为 ""
            result += "";
        }
    };
    return result
}
module.exports.filterEmoji  = filterEmoji;

const formatXmlResult = function (data){
    let result = data;
    for(let i in result){
        result[i] = result[i][0];
    }
    return result
}
module.exports.formatXmlResult  = formatXmlResult;

const randomNum =function(len) {
    len = len || 32;
    var chars = '0123456789';
    var maxPos = chars.length;
    var str = '';
    for (let i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
};
module.exports.randomNum  = randomNum;

//计算GPS距离
const toRad =  function (d) {  
    return d * Math.PI / 180
}
const getDisance = function (lat1, lng1, lat2, lng2) { 
    var dis = 0;
    var radLat1 = toRad(lat1);
    var radLat2 = toRad(lat2);
    var deltaLat = radLat1 - radLat2;
    var deltaLng = toRad(lng1) - toRad(lng2);
    var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
    return dis * 6378137;
}
module.exports.getDisance  = getDisance;