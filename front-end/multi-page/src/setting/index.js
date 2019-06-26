var HOST
var imgPrefix

if (process.env.NODE_ENV === 'development') {
  HOST = 'http://127.0.0.1:7001'
  imgPrefix = 'http://127.0.0.1:7001'
} else {
  HOST = 'http://127.0.0.1:7001'
  imgPrefix = 'http://127.0.0.1:7001'
}

export const IMGS_PREFIX = imgPrefix
export var SERVER_PREFIX = `${HOST}/api`

// 接口地址
export const urls = {
  addPic: `${SERVER_PREFIX}/picture/upload`
}

