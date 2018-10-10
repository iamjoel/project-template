'use strict';
const entities = require('./conf/entities')


module.exports = app => {
  const jwt =  app.middleware.jwt()
  
  //上传图片
  app.post(`/api/picture/upload`,jwt,app.controller.resourceUpload.upload);
  //上传音乐
  app.post(`/api/music/upload`,jwt,app.controller.resourceUpload.upload);
  //上传视频
  app.post(`/api/video/upload`,jwt,app.controller.resourceUpload.upload);
  //上传文件
  app.post(`/api/file/upload`,jwt,app.controller.resourceUpload.upload);
  //用户登录
  app.post(`/api/account/login`,jwt,app.controller.accountLogin.login);
  //weChatApi
  app.get(`/api/wechat/appid`,jwt,app.controller.weChatApi.getAppId);
  app.get(`/api/wechat/token`,jwt,app.controller.weChatApi.getToken);
  app.get(`/api/wechat/ticket`,jwt,app.controller.weChatApi.getTicket);
  app.post(`/api/wechat/sdkinfo`,jwt,app.controller.weChatApi.getSdkInfo);
  //获取用户信息snsapi_base
  app.get(`/api/wechat/snsapi_base/:code`,jwt,app.controller.weChatApi.snsapiBase);
  //获取用户信息snsapi_userinfo
  app.get(`/api/wechat/snsapi_userinfo/:code`,jwt,app.controller.weChatApi.snsapiUserInfo);
  //获取用户信息
  app.get(`/api/wechat/userinfo/:openid`,jwt,app.controller.weChatApi.userInfo);
  //获取prepayId
  app.post(`/api/wechat/prepay`,jwt,app.controller.weChatApi.getPrePayId);
  //支付回调
  app.post(`/api/wechat/paynotify`, app.controller.weChatApi.getPayNotify);

  for(var item in entities){
    app.get(`/api/${item}/detail/:id`,jwt,'commonCrud.detail');
    app.get(`/api/${item}/list`,jwt,'commonCrud.list');
    app.post(`/api/${item}/add`,jwt,'commonCrud.add');
    app.post(`/api/${item}/edit`,jwt,'commonCrud.edit');
    app.post(`/api/${item}/del/:id`,jwt,'commonCrud.del');
  }
};
