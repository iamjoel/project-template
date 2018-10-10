'use strict';
const errorMessage = require('../conf/errorMessage.js')

const fail = function fail(code,e = null) {
  return {
    errorCode:code,
    errorDetail:errorMessage[code].message||e
  }
  // if(code==100){
  //   return {
  //     errorCode:code,
  //     errorMessage:errorMessage[code].message,
  //     errorDetail:e
  //   }
  // }else if(code==998){
  //   return {
  //     errorCode:code,
  //     errorMessage:e,
  //     errorDetail:e
  //   }
  // }else if(code==119){
  //   return {
  //     errorCode:code,
  //     errorMessage:e.errcode,
  //     errorDetail:e.errmsg
  //   }
  // }else if(errorMessage[code] != undefined){
  //   return {
  //     errorCode:code,
  //     errorMessage:errorMessage[code].message,
  //     errorType:'logicError'
  //   }
  // }else if(e==null||e.errno!=undefined){
  //   return {
  //     errorCode:code,
  //     errorMessage:e.sqlMessage,
  //     errorType:'dataBaseError'
  //   }
  // }else{
  //   return {
  //     errorCode:code,
  //     errorMessage:e.message||e,
  //     errorType:'otherError'
  //   }
  // }
};
module.exports.fail = fail;

const success = function(data) {
  return Object.assign({
    errorCode: 0,
  }, data);
};
module.exports.success = success;
