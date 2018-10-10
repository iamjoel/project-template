'use strict';

const Tools = require('../util/tools')
const entities = require('../conf/entities')


module.exports.check  = function(entityName,data){
    let entity = entities[entityName]
    if(entity==undefined){
        return Tools.logicResult(1)
    }
    //检查是否是实体的字段
    let isInclude = isIncludeColumn(entity,data)
    if(isInclude.errorCode!=0){
        return Tools.logicResult(isInclude.errorCode,isInclude.data)
    }

    //必须输入检查
    let mustInput = mustInputCheck(entity,data)
    if(mustInput.errorCode!=0){
        return Tools.logicResult(mustInput.errorCode,mustInput.data)
    }

    //允许空值检查
    let allowEmpty = allowEmptyCheck(entity,data)
    if(allowEmpty.errorCode!=0){
        return Tools.logicResult(allowEmpty.errorCode,allowEmpty.data)
    }

    //长度检查
    let overLength = lengthCheck(entity,data)
    if(overLength.errorCode!=0){
        return Tools.logicResult(overLength.errorCode,overLength.data)
    }

    return Tools.logicResult(0,data)
}

//必须输入检查
const mustInputCheck = function(entity,data){ 
    let mustInputValue = entity.column.filter(item=>{
        return item.isRrequire == true
    })

    let isMustInputValueFlg = false
    let mustInputValueName = []
    mustInputValue.forEach(item=>{
        if(!data[item.name]){
            isMustInputValueFlg = true
            mustInputValueName.push(item.logicName)
        }
    })

    if(isMustInputValueFlg){
        return Tools.logicResult(-1,`${mustInputValueName.join(',')}为必填内容`)
    }else{
        return Tools.logicResult(0)
    }
}

//非空检查
const allowEmptyCheck = function(entity,data){
    let notAllowEmptytValue = entity.column.filter(item=>{
        return item.isAllowEmpty == false
    })
    let isAllowEmptyFlg = false
    let emptyValueName = []
    notAllowEmptytValue.forEach(item=>{
        if(data[item.name]==undefined||data[item.name]==null||data[item.name]==''){
            isAllowEmptyFlg = true
            emptyValueName.push(item.logicName)
        }
    })
    if(isAllowEmptyFlg){
        return Tools.logicResult(-1,`${emptyValueName.join(',')}不能为空值`)
    }else{
        return Tools.logicResult(0)
    }
}

//长度检查
const lengthCheck =  function(entity,data){
    let overLengthName = []
    let overLengthFlg =  false
    entity.column.forEach(item=>{
        if(data[item.name]){
            if(item.type=='string'){
                if(data[item.name].length > item.length){
                    overLengthName.push(`${item.logicName}长度超过${item.length}`)
                    overLengthFlg =true
                } 
            }else if(item.type=='int'){
                if(data[item.name] > Math.pow(10,item.length) - 1){
                    overLengthName.push(`${item.logicName}最大值必须小于${Math.pow(10,item.length) - 1}`)
                    overLengthFlg =true
                }
            }
        }
    })
    if(overLengthFlg){
        return Tools.logicResult(-1,overLengthName.join(','))
    }else{
        return Tools.logicResult(0)
    }
}

//是否为非法字段
const isIncludeColumn =  function(entity,data){
    let notIncludeName = []
    let notIncludeFlg = false
    for(let item in data){
        let columns = entity.column.filter(column=>{
            return column.name == item
        })
        if(columns.length==0){
            notIncludeName.push(item)
            notIncludeFlg = true
        }
    }
    if(notIncludeFlg){
        return Tools.logicResult(-1,`${notIncludeName.join(',')}为非法参数`)
    }else{
        return Tools.logicResult(0)
    }
}