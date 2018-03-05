var HOST

if (process.env.NODE_ENV === 'development') {
  HOST = 'http://127.0.0.1:7001' // 测试环境
} else {
  HOST = 'http://127.0.0.1:7001' // 测试环境
}

const SERVER_PREFIX = `${HOST}/public`
export const IMGS_PREFIX = `${HOST}/public/imgs`

export const urls = {
  'album': addUrlGroup('album')
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