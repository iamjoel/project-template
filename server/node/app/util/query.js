'use strict';

const Tools = require('../util/tools')
const entities = require('../conf/entities')


module.exports.resultFormat = function(queryData){
    let result = {};
    let list = [];

    for(let item in queryData){
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
    //有moreInfo时执行该处理
    list = Array.from(new Set(list));
    if(list.length>1){
        result[list[0]].moreInfo = {};
        list.forEach((item)=>{
            if(item!=list[0]){
                result[list[0]].moreInfo = Object.assign({[item]:result[item]},result[list[0]].moreInfo);
                delete result[item];
            }
        });
        result = result[list[0]];
    }

    return result
};

const getWhereQuery = function(where,entityAlias){
    let _where = [];
    let res = ''
    if(where==undefined||where==null||where.length==0){
        return res
    }
    //生成搜索条件
    for(let i=0;i<where.length;i++){
        for(var item in where[i]){
            _where.push(`${entityAlias}.${item} ${getSqlCondition(where[i][item])}`)
        }
    }

    //设置删除flg
    _where.push(`${entityAlias}.delFlg = 0`);
    res =  ` where ${_where.join(' and ')}`;
    
    return res
}

const getSqlCondition = function(str){
    let res = ''

    if(str.indexOf('_')==-1){
        if(typeof(str)==='string'){
            res = `= '${str}'`
        }else if(typeof(str)==='number'){
            res = `= ${str}`
        }    
    }else{
        let value =  str.split('_')[1]
        let condition =  str.split('_')[0]
        let symbol = ''
        //gt:> gte:>= lt:< lte:<= ne:!= like:like
        //格式 gt_1  in_1,2
        switch(condition){
            case 'gt': 
                symbol= '>'
                break
            case 'gte':
                symbol= '>='
                break
            case 'lt': 
                symbol= '<'
                break
            case 'lte':
                symbol= '<='
                break
            case 'ne':
                symbol= '!='
                break
            case 'in':
                symbol= 'in'
                value = `(${value})`
                break
            case 'like':
                symbol= 'like'
                value = `%${value}%`
                break
            default:
                symbol= '='
                break
        }
        if(isNaN(value)){
            value = `'${value}'`
        }else{
            value = `${value}`
        }
        res = `${symbol} ${value}`
    }

    return res
}

const getOrderQuery = function(orders,entityAlias){
    let res = ''
    res = `${res} order by`;
    if(orders==undefined||orders==null||orders.length==0){
        res = `${res} ${entityAlias}.updateTime desc `
        return res
    }
    
    for(let i=0;i<orders.length;i++){
        let name = orders[i][0]
        let order = orders[i][1]||'desc'
        res = `${res} ${entityAlias}.${name} ${order} ,`
    }
    res = `${res} ${entityAlias}.updateTime desc `

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
module.exports.pagination = pagination

const Columnmaker = function(entity){
    let column = []
    
    //获取本实体的列
    for(let i=0;i<entity.column.length;i++){
        column.push(`${entity.alias}.${entity.column[i].name} as ${entity.alias}_${entity.column[i].name}`)
    }
    //获取关联实体的列
    for(let x=0;x<entity.relatedEntities.length;x++){
        let relatedEntity = entities[entity.relatedEntities[x].entity]
        if(relatedEntity!=undefined){
            for(let y=0;y<relatedEntity.column.length;y++){
                column.push(`${relatedEntity.alias}.${relatedEntity.column[y].name} as ${relatedEntity.alias}_${relatedEntity.column[y].name}`)
            }
        }else{
            return Tools.logicResult(2)
        }
    }
    
    return Tools.logicResult(0,column.join(','))
}

const joinMaker = function(mainEntityName,relatedEntities){
    let res = ''
    relatedEntities.forEach((item)=>{
        let mainEntity = entities[mainEntityName]
        let subEntity = entities[item.entity]
        let mainKey = ''
        let subKey = ''
        if(item.key.main.indexOf('.')>-1){
            mainKey = item.key.main
        }else{
            mainKey = `${mainEntity.alias}.${item.key.main}`
        }
        if(item.key.sub.indexOf('.')>-1){
            subKey = item.key.sub
        }else{
            subKey = `${subEntity.alias}.${item.key.sub}`
        }

        res = res + ` ${item.joinType} ${subEntity.name} as ${subEntity.alias} on  ${mainKey} = ${subKey}`;
    });
    return res
}

const generatorQuery = function(entityName, pageAt = 1, where, orders, pageLimit = 10,type = 'query'){
    let query = '';
    let entity = entities[entityName]
    //是否有实例
    if(entity==undefined){
        return Tools.logicResult(1)
    }
    
    //生成column
    let column = Columnmaker(entity)
    if(column.errorCode!=0){
        return Tools.logicResult(column.errorCode) 
    }else{
        column = column.data
    }
    
    //拼接select部分
    if(type=='query'||type=='detail'){
        query = `select ${column} from ${entity.name} as ${entity.alias} `;
    }else{
        query = `select count(${entity.alias}.id) as num from ${entity.name} as ${entity.alias} `;
    }
    query = query + joinMaker(entityName,entity.relatedEntities)
    
    //where条件拼接
    query = query + getWhereQuery(where,entity.alias)
    if(type=='detail'){
        console.log(query)
        return Tools.logicResult(0,query) 
    }
    //order拼接
    query = query + getOrderQuery(orders,entity.alias)
    //分页
    if(type!='count'){
        query = query + pagination(pageAt,pageLimit)
    }
    console.log(query)
    return Tools.logicResult(0,query) 
};
module.exports.generatorQuery  = generatorQuery;