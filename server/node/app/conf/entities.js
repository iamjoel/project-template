'use strict';

const setting = require('../conf/setting')

//数据类型
const DATA_TYPE = {
    STRING:'string',
    INT:'int',
    DATATIME:'datetime'
}

//表结合类型
const JOIN_TYPE = {
    LEFT:'left join',
    RIGHT:'right join',
    INNER:'inner join'
}

const PREFIX = setting.PREFIX

const entities = {
    category:{
        //资源名(表名)
        name:`${PREFIX}category`,
        //资源名别名
        alias:'category',
        role:[1,2,3],
        column:[
            //字段类型:int,varchar,datetime,timestamp,text,
            {name:'name',logicName:'账号',type:DATA_TYPE.STRING,length:40,isRrequire:true,isAllowEmpty:false},
        ],
        relatedEntities:[]
    },
    account:{
        //资源名(表名)
        name:`${PREFIX}account`,
        //资源名别名
        alias:'account',
        role:[1,2,3],
        column:[
            //字段类型:int,varchar,datetime,timestamp,text,
            {name:'account',logicName:'账号',type:DATA_TYPE.STRING,length:40,isRrequire:true,isAllowEmpty:false},
            {name:'password',logicName:'密码',type:DATA_TYPE.STRING,length:100,isRrequire:true,isAllowEmpty:false},
            {name:'name',logicName:'姓名',type:DATA_TYPE.STRING,length:40,isRrequire:true,isAllowEmpty:false},
            {name:'role',logicName:'角色',type:DATA_TYPE.INT,length:1,isRrequire:true,isAllowEmpty:false},
        ],
        relatedEntities:[]
    },
    userinfo:{
        //资源名(表名)
        name:`${PREFIX}userinfo`,
        //资源名别名
        alias:'userinfo',
        role:[1,2,3],
        column:[
            //字段类型:int,varchar,datetime,timestamp,text,
            {name:'openid',logicName:'openid',type:DATA_TYPE.STRING,length:128,isRrequire:true,isAllowEmpty:false},
            {name:'nickname',logicName:'昵称',type:DATA_TYPE.STRING,length:200,isRrequire:false,isAllowEmpty:true},
            {name:'sex',logicName:'性别',type:DATA_TYPE.INT,length:1,isRrequire:false,isAllowEmpty:true},
            {name:'city',logicName:'城市',type:DATA_TYPE.STRING,length:40,isRrequire:false,isAllowEmpty:true},
            {name:'province',logicName:'省份',type:DATA_TYPE.STRING,length:40,isRrequire:false,isAllowEmpty:true},
            {name:'country',logicName:'国家',type:DATA_TYPE.STRING,length:40,isRrequire:false,isAllowEmpty:true},
            {name:'headimgurl',logicName:'头像',type:DATA_TYPE.STRING,length:200,isRrequire:false,isAllowEmpty:true},
            {name:'subscribe',logicName:'关注Flg',type:DATA_TYPE.INT,length:1,isRrequire:false,isAllowEmpty:true},
        ],
        relatedEntities:[
            {entity:`userinfo_extend`,
                key:{
                    main:'openid',
                    sub:'openid'
                },
                joinType:JOIN_TYPE.LEFT
            },
        ]
    },
    userinfo_extend:{
        //资源名(表名)
        name:`${PREFIX}userinfo_extend`,
        //资源名别名
        alias:'userinfoExtend',
        role:[1,2,3],
        column:[
            //字段类型:int,varchar,datetime,timestamp,text,
            {name:'openid',logicName:'账号',type:DATA_TYPE.STRING,length:40,isRrequire:true,isAllowEmpty:false},
            {name:'name',logicName:'密码',type:DATA_TYPE.STRING,length:100,isRrequire:true,isAllowEmpty:false},
        ],
        relatedEntities:[
            {
                entity:`userinfo`,
                key:{
                    main:'openid',
                    sub:'openid'
                },
                joinType:JOIN_TYPE.LEFT
            },
        ]
    },
}

//加入所有实体都需要的字段
for(var item in entities){
    entities[item].column = [
        ...entities[item].column,
        {name:'id',logicName:'id',type:DATA_TYPE.STRING,length:36,isRrequire:false,isAllowEmpty:false},
        {name:'delFlg',logicName:'删除Flg',type:DATA_TYPE.INT,length:1,isRrequire:false,isAllowEmpty:true},
        {name:'createTime',logicName:'创建时间',type:DATA_TYPE.DATATIME,length:0,isRrequire:false,isAllowEmpty:true},
        {name:'updateTime',logicName:'更新时间',type:DATA_TYPE.DATATIME,length:0,isRrequire:false,isAllowEmpty:true}
    ]
}

module.exports = entities