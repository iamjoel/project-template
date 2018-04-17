import standardizeMenu from '@/assets/utils/standardize-menu-config'
var HOST

if (process.env.NODE_ENV === 'development') { // 与后端联调
  HOST = 'http://127.0.0.1:3000'
} else { // 线上环境
  HOST = 'http://127.0.0.1:3000'
}

export const IMGS_PREFIX = `${HOST}/imgs`
export var SERVER_PREFIX = `${HOST}/api`

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
      listUseCommon: true, // 用通用页面
      updateUseCommon: true, // 用通用页面
    }]
  },
]

// 接口地址
export const urls = {
  addPic: `${SERVER_PREFIX}/addPic`
}

// 标准化菜单配置
export var menuConfig = standardizeMenu(_menuConfig, urls, SERVER_PREFIX)

// 全栈JavaScript错误监控 https://fundebug.com/
export const fundebugAPIKey = 'b3899a382b2a7117d2d479959a07a18b3d92d6a7a5ebd6ef14d14eac699be95d'

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

