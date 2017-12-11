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
export const PAGES = [
  {
    id: 'music',
    name: '音乐',
    children: [{
      id: 'song',
      name: '歌曲',
    }]
  }
]

// 接口地址
export const urls = {}

// 添加常规的页面对应的地址
PAGES.forEach(item => {
  item.children.forEach(child => {
    var pageKey = child.pageKey || child.id
    urls[pageKey] = addUrlGroup(`${SERVER_PREFIX}/${pageKey}`, child.pageTypes, child.otherTypes)
  })
})

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

