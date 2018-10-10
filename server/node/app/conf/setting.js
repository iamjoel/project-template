'use strict';

const staticPath ='./app/public'//本地路径
//const staticPath = '/usr/local/nginx/html/demo/resource',//线上路径
//服务器地址
const serverUrl = 'http://47.96.189.4:7001'

const setting = {
    //资源通配符
    PREFIX:'demo_',
    //静态资源地址
    staticPath:staticPath,//本地路径
    //服务器地址
    serverUrl:serverUrl,
    //微信配置信息
    wechatInfo:{
        //公众号ID
        appId:'wx358d1d9cd3d7bc8c',
        //公众号密码
        secret:'1ca2d4e87d5cde5dee1b6e55429ffc26',
        //商户ID
        mch_id:'1491194932',
        //商户密码
        payPassWord:'NvAPtO3YDmAKP3sMXZ13gAMsVf8bczA8',
        //交易回调地址
        payCallbackUrl:'http://zhixingclub.com:7001/api/wechat/paynotify',
        //payCallbackUrl:'http://1t60716a51.iok.la:21622/api/wechat/paynotify',
        //服务器地址
        ipAddress:'47.96.189.4',
        //展示名称
        shopName:'柏嘉优护'
    },
    // 阿里云ACCESS_KEY_ID/ACCESS_KEY_SECRET 短信
    aliyunAccessKey:{
        id:'LTAIvCg0pJmamGfs',
        key:'27Zo7eMqPMxBSFvwO9KC2yeNdnaaGp'
    },
    //jwt秘钥 
    jwtTokenSecret:'demo',
    //上传资源路径
    uploadResourcePath:{
        imgPath:`${staticPath}/img`,
        musicPath:`${staticPath}/music`,
        videoPath:`${staticPath}/video`,
        filePath:`${staticPath}/file`,
    },
    //ejs静态资源地址
    resourcePath:`${serverUrl}/public`,
    //图片访问地址
    imgPath:`${serverUrl}/public/img/`,
    //url白名单
    whiteRouterList:[
        '/public',
        '/api/account/login',
        '/api/picture/upload',
    ],
    //API免认证key
    publicApiKey:'demo_wechat',
    qiniuOss:{
        enable:false,//是否启用
        isSaveOnLocal:false,//是否保存在本地
        accessKey:'-HLD034FdM87pyQolWxUBpZypDhIzM7NSXpin0nS',
        secretKey:'rltTORSgg6bcv5pFnNHFbwej3DwxajP3uxZIlp0_',
        bucket:'zhixingclub',
        url:'http://pfr5h9qyx.bkt.clouddn.com'
    }
}
module.exports = setting