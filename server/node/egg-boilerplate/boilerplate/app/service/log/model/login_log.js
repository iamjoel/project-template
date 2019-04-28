module.exports = {
  "viewFields": [
    "id",
    "createTime",
    "updateTime",
    "delFlg",
    "accountId",
    "loginTime",
    "ipAddress",
    "longitude",
    "latitude",
    "address"
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
        "type": "string",
        "max": 50
      },
      "validType": "all"
    },
    {
      "key": "loginTime",
      "name": "登录时间",
      "rule": {
        "required": true,
        "type": "number"
      },
      "validType": "all"
    },
    {
      "key": "ipAddress",
      "name": "IP地址",
      "rule": {
        "required": true,
        "type": "string",
        "max": 50
      },
      "validType": "all"
    },
    {
      "key": "longitude",
      "name": "经度",
      "rule": {
        "required": true,
        "type": "string",
        "max": 50
      },
      "validType": "all"
    },
    {
      "key": "latitude",
      "name": "纬度",
      "rule": {
        "required": true,
        "type": "string",
        "max": 50
      },
      "validType": "all"
    },
    {
      "key": "address",
      "name": "定位地址",
      "rule": {
        "required": true,
        "type": "string",
        "max": 50
      },
      "validType": "all"
    }
  ]
}