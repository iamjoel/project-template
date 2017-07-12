import Mock from 'mockjs'
import { urls } from '@/setting'
var Random = Mock.Random

var menu = [{
    "innerid": Random.guid(),
    "chname": "系统管理",
    "icon": 'message',
    children: [{
        "innerid": Random.guid(),
        "chname": "欢迎页",
        path: '/system/dashboard',
    }, {
        "innerid": Random.guid(),
        "chname": "绑定钉钉帐号",
        path: '/system/dashboard'
    }, {
        "innerid": Random.guid(),
        "chname": "系统公告",
        path: '/system/notice/list'
    }]
}, {
    "innerid": Random.guid(),
    "chname": "基础数据",
    "icon": 'message',
    children: [{
        "innerid": Random.guid(),
        "chname": "公司管理",
        path: '/data/company/list',
    }, {
        "innerid": Random.guid(),
        "chname": "大区管理",
        path: '/data/region/list',
    }, {
        "innerid": Random.guid(),
        "chname": "项目点管理",
        path: '/data/site/list'
    }, {
        "innerid": Random.guid(),
        "chname": "成本中心管理",
        path: '/data/cost-center/list'
    }, {
        "innerid": Random.guid(),
        "chname": "项目点客户档案管理",
        path: '/data/client/list',
    }, {
        "innerid": Random.guid(),
        "chname": "供应商档案管理",
        path: '/data/supplier/list',
    },{
        "innerid": Random.guid(),
        "chname": "原材料大类管理",
        path: '/data/inventory-main/list',
    },{
        "innerid": Random.guid(),
        "chname": "原材料小类管理",
        path: '/data/inventory-sub/list',
    },{
        "innerid": Random.guid(),
        "chname": "原材料编码管理",
        path: '/data/inventory-code/list',
    }]
}, {
    "innerid": Random.guid(),
    "chname": "人事管理",
    "icon": 'message',
    children: [{
        "innerid": Random.guid(),
        "chname": "帐号",
        path: '/hr/account/list',
    }]
}, {
    "innerid": Random.guid(),
    "chname": "进销存管理",
    "icon": 'message',
    children: [{
        "innerid": Random.guid(),
        "chname": "核价单模板管理",
        path: '/pss/inquiry-check-template/list',
    },{
        "innerid": Random.guid(),
        "chname": "询价单管理",
        path: '/pss/inquiry/list',
    },{
        "innerid": Random.guid(),
        "chname": "核价单管理",
        path: '/pss/inquiry-check/list',
    },{
        "innerid": Random.guid(),
        "chname": "采购单管理",
        path: '/pss/purchase/list',
    },{
        "innerid": Random.guid(),
        "chname": "入库单管理",
        path: '/pss/in-warehouse/list',
    },{
      "innerid": Random.guid(),
      "chname": "生产领料单管理",
      path: '/pss/out-warehouse/list',
    },{
        "innerid": Random.guid(),
        "chname": "库存管理",
        path: '/pss/stock/list',
    },{
        "innerid": Random.guid(),
        "chname": "汇总查询",
        path: '/pss/stock-total/list',
    },{
        "innerid": Random.guid(),
        "chname": "日结查询",
        path: '/day/day/list',
    }]
}, ]

var limit = [{
    "innerid": Random.guid(),
    "menukey": "site",
    "modulekey": "base",
    "permission": 223
},
{
    "innerid": Random.guid(),
    "menukey": "client",
    "modulekey": "base",
    "permission": 223
},{
    "innerid": Random.guid(),
    "menukey": "region",
    "modulekey": "base",
    "permission": 223
},{
    "innerid": Random.guid(),
    "menukey": "supplier",
    "modulekey": "base",
    "permission": 223
},{
    "innerid": Random.guid(),
    "menukey": "inventory_class",
    "modulekey": "base",
    "permission": 223
},{
    "innerid": Random.guid(),
    "menukey": "inventory",
    "modulekey": "base",
    "permission": 223
}]

var limit = [
  addLimit('company'),
  addLimit('site'),
  addLimit('cost-center'),
  addLimit('inquiry'),
  addLimit('inquiry-check'),
  addLimit('inquiry-check-template'),
  addLimit('purchase'),
  addLimit('summary-query'),
  addLimit('client'),
  addLimit('region'),
  addLimit('supplier'),
  addLimit('inventory-main-type'),// 原料大类
  addLimit('inventory-sub-type'),// 原料大类
  addLimit('inventory'),
  addLimit('in-warehouse'),
  addLimit('stock'),
]

// 加一条权限的模拟数据
function addLimit(name) {
    return {
        "innerid": Random.guid(),
        "menukey": name,
        "modulekey": "base",
        "permission": 223
    }
}

Mock.mock(new RegExp(urls.menuAndLimit), ({ url, body }) => {
    return {
        "errcode": 0,
        "errmsg": "",
        "msgbody": {
            menu,
            limit
        }
    }
})
