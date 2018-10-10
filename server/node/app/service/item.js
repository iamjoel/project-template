const Service = require('egg').Service;
var Tools = require('../util/tools.js');
var uuid = require('uuid');

class item extends Service {
    * addCheck (data){
        try{
            console.log(1)
            return Tools.logicResult(0,data)
        }catch(e){
            return Tools.logicResult(-1,e)
        }
    }

    * editCheck (data){
        try{
            console.log('item logic edit')
            return Tools.logicResult(0,data)
        }catch(e){
            return Tools.logicResult(-1,e)
        }
    }

    * delCheck (data){
        try{
            console.log('item logic del')
            return Tools.logicResult(0,data)
        }catch(e){
            return Tools.logicResult(-1,e)
        }
    }
}
module.exports = item;