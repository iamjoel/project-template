var HOST
var imgPrefix
var appid // 公众号id

console.log(process.env.NODE_ENV)

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
  // TODO 把这四个放在 wechat 下。 wechat: {userInfo: ..}
  userInfo: `${SERVER_PREFIX}/wechat/userinfo`, // 微信基本信息
  registerWechat: `${SERVER_PREFIX}/wechat/sdkinfo`, // 注册 jssdk 信息
  getOpenid: `${SERVER_PREFIX}/wechat/openid`, // 微信的 openid
  getPayInfo: `${SERVER_PREFIX}/wechat/prepay`, // 微信支付信息

  care_service: addUrlGroup('care_service'),
  single_service: addUrlGroup('single_service'),
  skill: addUrlGroup('skill'),
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