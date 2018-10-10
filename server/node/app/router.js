'use strict';
const setting = require('./conf/setting')


module.exports = app => {
  //上传图片
  app.post(`/api/picture/upload`, app.controller.resourceUpload.upload);
  //上传音乐
  app.post(`/api/music/upload`, app.controller.resourceUpload.upload);
  //上传视频
  app.post(`/api/video/upload`, app.controller.resourceUpload.upload);
  //上传文件
  app.post(`/api/file/upload`, app.controller.resourceUpload.upload);

  //用户登录
  // app.post(`/api/account/login`, app.controller.accountLogin.login);
  
  //weChatApi
  app.get(`/api/wechat/appid`, app.controller.weChatApi.getAppId);
  app.get(`/api/wechat/token`, app.controller.weChatApi.getToken);
  app.get(`/api/wechat/ticket`, app.controller.weChatApi.getTicket);
  app.post(`/api/wechat/sdkinfo`, app.controller.weChatApi.getSdkInfo);
  app.get(`/api/wechat/userinfo/:id`, app.controller.weChatApi.getUserInfo);
  app.get(`/api/wechat/openid/:code`, app.controller.weChatApi.getOpenid);
  app.post(`/api/wechat/prepay`, app.controller.weChatApi.getPrePayId);
  app.post(`/api/wechat/paynotify`, app.controller.weChatApi.getPayNotify);
  app.get(`/public/wechat/OAuth/:code`, app.controller.weChatApi.getUserInfoByOAuth);

  setting.resourceList.forEach(resourceName => {
    addCRUD(app, resourceName)
  })
};

function addCRUD(app, resourceName) {
  app.get(`/api/${resourceName}/detail/:id`, 'commonCrud.detail');
  app.get(`/api/${resourceName}/list`, 'commonCrud.list');
  app.post(`/api/${resourceName}/add`, 'commonCrud.add');
  app.post(`/api/${resourceName}/edit`, 'commonCrud.edit');
  app.post(`/api/${resourceName}/del/:id`, 'commonCrud.del');
}