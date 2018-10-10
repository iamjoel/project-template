const Service = require('egg').Service;
var Tools = require('../../util/tools.js');
var uuid = require('uuid');
const SMSClient = require('@alicloud/sms-sdk')
const setting = require('../../conf/setting.js')
const smsClient = new SMSClient({accessKeyId:setting.aliyunAccessKey.id, secretAccessKey:setting.aliyunAccessKey.key})
const sendSms =  function(message){
    return new Promise((resolve, reject)=> {
        smsClient.sendSMS(message).then(function (res) {
            let {Code}=res
            if (Code === 'OK') {
                //处理返回参数
                resolve(res)
            }
        }, function (err) {
            resolve(err)
        })
    })
}

class sms extends Service {
    * send (data){
        try{
            const sms = yield sendSms(data)
            if(sms.Code!='OK'){
                return Tools.logicResult(239)
            }
            return Tools.logicResult(0,'success')
        }catch(e){
            return Tools.logicResult(-1,e)
        }
    }
}
module.exports = sms;