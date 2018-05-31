'use strict';
const PREFIX = require('../conf/setting').PREFIX

module.exports.list = [
    {
        mainTable:`${PREFIX}item`,
        mainTableAs:'item',
        mainColumn:'id,name,detail,img,categoryId',
        joinTables:[
            {
                joinTable:`${PREFIX}category`,
                joinTableAs:'category',
                joinTableColumn:'id,name,detail',
                joinKey:['categoryId','id'],
                joinType:"left join"
            }
        ]
    },
]

module.exports.specialSql = {
    item:{
        //list:`select * from ${PREFIX}item`,
        detail:`select * from ${PREFIX}item`,
        count:`select count(*) as num from ${PREFIX}item`
    }
}