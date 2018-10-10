'use strict';

//资源通配符
const PREFIX = 'demo_';
module.exports.PREFIX = PREFIX;

//静态资源地址
const staticPath = './app/public'
module.exports.staticPath = staticPath;

//服务器地址
const serverUrl = 'http://localhost:7001'
module.exports.serverUrl = serverUrl;

//微信配置信息
const wechatInfo ={
    //公众号ID
    appId:'',
    //公众号密码
    secret:'',
    //商户ID
    mch_id:'',
    //商户密码
    payPassWord:'',
    //交易回调地址
    payCallbackUrl:'',
    //服务器地址
    ipAddress:''
};
module.exports.wechatInfo = wechatInfo;

//jwt秘钥  
const jwtTokenSecret = 'demo';
module.exports.jwtTokenSecret = jwtTokenSecret;

//上传资源路径
const uploadResourcePath ={
    imgPath:`${staticPath}/img`,
    musicPath:`${staticPath}/music`,
    videoPath:`${staticPath}/video`,
    filePath:`${staticPath}/file`,
};
module.exports.uploadResourcePath = uploadResourcePath;

const zipImg = {
    enable:false,
    thumbImgPath: `${staticPath}/img/thumb`,
    size:'200x200'
}
module.exports.zipImg = zipImg;

//ejs静态资源地址
const resourcePath = `${serverUrl}/public`
module.exports.resourcePath = resourcePath;

//图片访问地址
const imgPath = `${serverUrl}/public/img/`
module.exports.imgPath = imgPath;

//api白名单
const whiteRouterList = [
    '/public',
    '/api/account/login',
    '/api/picture/upload',
]
module.exports.whiteRouterList = whiteRouterList;

//资源列表
const resourceList = [
    'item',
    'category'
]
module.exports.resourceList = resourceList;

//模糊查询字段
const likeFieldlist = [
    'name',
    'detail',
    'nickname',
]
module.exports.likeFieldlist = likeFieldlist;

//API免认证key
const publicApiKey = 'wechat'
module.exports.publicApiKey = publicApiKey;
