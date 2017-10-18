var SERVER_PREFIX
var HOST

if (process.env.NODE_ENV === 'development') { // 开发环境
  HOST = 'http://127.0.0.1:8001' 
} else { // 线上环境
  HOST = 'http://amusement.com/api' 
}

export const urls = {
  song: addUrlGroup(`${SERVER_PREFIX}/song`)
}

export const oauth2 = {
  appid: 'xxx',
  appsecret: 'xxx'
}

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

function addUrlGroup (prefix, types = ['list', 'detail', 'del', 'add', 'edit']) {
  var res = {}
  types.forEach(type => {
    res[type] = `${prefix}/${type}`
  })
  return res
}

