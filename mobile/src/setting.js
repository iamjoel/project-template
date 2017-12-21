var HOST

if (process.env.NODE_ENV === 'development') {
  HOST = 'http://192.168.2.102:7001' // 测试环境
} else {
  HOST = 'http://test.91wego.com:8001' // 线上环境
}

const SERVER_PREFIX = `${HOST}/public`
export const IMGS_PREFIX = `${HOST}/public/imgs`

export const urls = {
  'album': addUrlGroup('album')
}

export const ROLE = {
  'property': 10, // 物业
  'worker': 20, // 工人
  'customer': 30, // 业主
}

function addUrlGroup (prefix, types = ['list', 'detail', 'add', 'edit','del'], others) {
  var res = {}
  if(others && others.length > 0) {
    types = [...types, ...others]
  }
  types.forEach(type => {
    res[type] = `${prefix}/${type}`
  })
  return res
}