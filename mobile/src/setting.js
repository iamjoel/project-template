var HOST
var imgPrefix
var appid // 公众号id

if (process.env.NODE_ENV === 'development') {
  HOST = document.body.getAttribute('data-server-dev')
  imgPrefix = document.body.getAttribute('data-img-prefix-dev')
  appid = document.body.getAttribute('data-appid-dev')
} else {
  HOST = document.body.getAttribute('data-server')
  imgPrefix = document.body.getAttribute('data-img-prefix')
  appid = document.body.getAttribute('data-appid')
}

export const SERVER_PREFIX = `${HOST}/api`
export const IMGS_PREFIX = imgPrefix
export const APPID = appid

export const urls = {
}

function addUrlGroup (key, types = ['list', 'detail', 'add', 'edit','del'], others) {
  var res = {}
  if(others && others.length > 0) {
    types = [...types, ...others]
  }
  types.forEach(type => {
    res[type] = `${SERVER_PREFIX}/${key}/${type}`
  })
  return res
}