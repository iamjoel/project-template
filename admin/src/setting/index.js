import standardizeMenu from '@/assets/utils/standardize-menu-config'
var HOST
var useFEMock = false

if (process.env.NODE_ENV === 'mock') { // 用 Mock Server mock数据
  HOST = 'http://127.0.0.1:5000'
} else if (process.env.NODE_ENV === 'development') { // 与后端联调
  useFEMock = true
  HOST = 'http://127.0.0.1:3000'
} else { // 线上环境
  useFEMock = true // GitHub 不支持部署后端，所以Mock
  HOST = 'http://127.0.0.1:3000'
}

// 全栈JavaScript错误监控 https://fundebug.com/
export const fundebugAPIKey = 'b3899a382b2a7117d2d479959a07a18b3d92d6a7a5ebd6ef14d14eac699be95d'

export const IMGS_PREFIX = `${HOST}/imgs`
export var isMock = useFEMock

export var SERVER_PREFIX = `${HOST}/api`

// 基础数据。以后存在服务器
import roles from './roles.js'
export var rolesConfig = roles
import dict from './dict.js'
export var dictConfig = dict
import entities from './entities.js'
export var entitiesConfig = entities
import navMenu from './nav-menu.js'
export var navMenuConfig = navMenu
import pages from './pages.js'
export var pagesConfig = pages


// 页面
var _menuConfig = [
  {
    id: 'dashboard',
    name: '仪表盘',
    pages: [{
      type: 'dashboard',
      filePath: 'dashboard',
      routePath: 'dashboard'
    }]
  },
  {
    id: 'account',
    name: '帐号',
    role: 'admin', // 只有管理员才能看
  },
  {
    id: 'music',
    name: '音乐',
    children: [{
      id: 'song',
      name: '歌曲',
    }, {
      id: 'singer',
      name: '歌手',
      useCommon: true, // 用通用页面
    }]
  },
]

export const urls = {}

const DEFAULT_PAGES = [{
  type: 'list'
},{
  type: 'update'
},{
  type: 'view'
},]


// 标准化
export var menuConfig = standardizeMenu(_menuConfig, DEFAULT_PAGES, urls, SERVER_PREFIX)
console.log(menuConfig)
// 接口地址

// 权限值
export const LIMIT_KEY = {
  'ADD': 1,
  'EDIT': 2,
  'DELETE': 4,
  'LIST': 8,
  'QUERY': 16,
  'ADUIT': 32,
}

export const ERROR_CODE_MAP = {
  19: '没有权限'
}

function addUrlGroup (prefix, types = ['list', 'detail', 'add', 'edit', 'del'], others) {
  var res = {}
  if(others && others.length > 0) {
    types = [...types, ...others]
  }
  types.forEach(type => {
    res[type] = `${prefix}/${type}`
  })
  return res
}

