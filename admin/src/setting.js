import standardizeMenu from '@/assets/utils/standardize-menu-config'
var SERVER_PREFIX
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

export const IMGS_PREFIX = `${HOST}/imgs`
export var isMock = useFEMock

SERVER_PREFIX = `${HOST}/api`

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
    id: 'music',
    name: '音乐',
    children: [{
      id: 'song',
      name: '歌曲',
    }]
  }
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

