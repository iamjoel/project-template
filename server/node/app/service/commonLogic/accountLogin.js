const Parameter = require('parameter');
const Response = require('../../util/response.js');
const Tools = require('../../util/tools.js');
const jwt = require('jwt-simple');
const moment = require('moment');
const setting = require('../../conf/setting.js')

module.exports = app => {
    return class accountLogin extends app.Service {

        * login (data){
            try{
                if(data.account==undefined){
                    return Tools.logicResult(115) 
                }
                if(data.password==undefined){
                    return Tools.logicResult(116)
                }
                const userInfo = yield this.app.mysql.query(`select account,password,name,role from ${setting.PREFIX}account where account='${data.account}' and password='${data.password}' and delFlg = 0`)
                if(userInfo.length!=1){
                    return Tools.logicResult(117)
                }else{
                    //设置时间
                    var expires = moment().add('8','Hour').valueOf();
                    var token = jwt.encode({
                        account:userInfo[0].account,
                        name:userInfo[0].name,
                        role:userInfo[0].role,
                        exp: expires
                    }, setting.jwtTokenSecret);

                    return Tools.logicResult(0,{
                        account:userInfo[0].account,
                        name:userInfo[0].name,
                        role:userInfo[0].role,
                        token:token
                    })
                }
            } catch(e) {
                return Tools.logicResult(-1,e)
            }
        }
    }
};
