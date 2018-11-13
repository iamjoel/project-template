'use strict';

module.exports = appInfo => {
  const config = {};

  // 一定要配置  cookie need secret key to sign and encrypt
  config.keys = appInfo.name; // package.json 里的 name

  // 启用的中间件
  config.middleware = [ 
    // 'acl' 
    'filterEdit'
  ]

  // mysql 配置
  const mySqlConfig = require('./mysql');
  config.mysql = {
    client: mySqlConfig,
  };

  // 跨域头
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  };

  // 跨域 新增，编辑时缺，会报错。
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // 一页多少条
  config.PAGE_LIMIT = 10;

  // 上传资源的路径
  const staticPath = './app/public';// 本地路径
  config.uploadResourcePath = {
    img: `${staticPath}/img`,
    music: `${staticPath}/music`,
    video: `${staticPath}/video`,
    file: `${staticPath}/file`,
  };

  // 文件上方的后缀的白名单
  config.multipart = {
    fileSize: '50mb',
    fileExtensions: [
      '.txt',
      '.docx',
      '.doc',
      '.xlsx',
      '.xls',
      '.ppt',
      '.pptx',
    ],
  }

  config.jwtTokenSecret = 'demo'; // token 的密钥

  /**
   * some description
   * @member Config#test
   * @property {String} key - some description
   */
  config.test = {
    key: appInfo.name + '_123456',
  };

  return config;
};
