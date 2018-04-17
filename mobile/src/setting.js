var HOST

if (process.env.NODE_ENV === 'development') {
  HOST = 'http://127.0.0.1:7001'
} else {
  HOST = 'http://127.0.0.1:7001'
}

const SERVER_PREFIX = `${HOST}/public`
export const IMGS_PREFIX = `${HOST}/public/imgs`

export const urls = {
  registerWechat: `${SERVER_PREFIX}/wechat/sdkinfo`, // 注册jssdk
  getOpenid: `${SERVER_PREFIX}/wechat/openid`, // 拿微信的 openid
  getPayInfo: `${SERVER_PREFIX}/wechat/prepay`, //
  userInfo: `${SERVER_PREFIX}/wechat/userinfo`,
  album: addUrlGroup('album')
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