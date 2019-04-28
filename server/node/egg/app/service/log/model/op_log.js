module.exports = {
  "viewFields": [
    "id",
    "createTime",
    "updateTime",
    "delFlg",
    "accountId",
    "tableName",
    "dataId",
    "action",
    "params"
  ],
  "validFields": [
    
    {
      "key": "createTime",
      "name": "创建时间",
      "rule": {
        "required": false,
        "type": "number"
      },
      "validType": "all"
    },
    {
      "key": "updateTime",
      "name": "更新时间",
      "rule": {
        "required": false,
        "type": "number"
      },
      "validType": "all"
    },
    {
      "key": "delFlg",
      "name": "删除标志位",
      "rule": {
        "required": false,
        "type": "int"
      },
      "validType": "all"
    },
    {
      "key": "accountId",
      "name": "帐号",
      "rule": {
        "required": true,
        "type": "number",
        "max": 50
      },
      "validType": "all"
    },
    {
      "key": "tableName",
      "name": "操作表",
      "rule": {
        "required": true,
        "type": "string",
        "max": 50
      },
      "validType": "all"
    },
    {
      "key": "dataId",
      "name": "操作数据",
      "rule": {
        "required": true,
        "type": "number",
        "convertType": "number"
      },
      "validType": "all"
    },
    {
      "key": "action",
      "name": "动作",
      "rule": {
        "required": true,
        "type": "number",
        "max": 50
      },
      "validType": "all"
    },
    {
      "key": "params",
      "name": "详情",
      "rule": {
        "required": true,
        "type": "string",
        "max": 50
      },
      "validType": "all"
    }
  ]
}