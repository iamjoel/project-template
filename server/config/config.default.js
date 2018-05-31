'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_zhixingclub';

  // 自定义中间件
  //config.middleware = [ 'bodyparser', 'tokencheck', 'xmlbodytransfer'];
  config.middleware = ['bodyparser', 'xmlbodytransfer'];

  // log输出
  config.logger = {
    dir: './logs/server-template',
    level: 'DEBUG',
  };

  // bodyParser设置
  config.bodyParser = {
    enable: false,
  };

  // 安全设置
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // mysql设置
  config.mysql = {
    client: {
      host: '47.96.189.4',
      port: '3306',
      user: 'root',
      password: 'pa!21word',
      // 数据库名
      database: 'demo',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // cors设置
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  };

  // 静态服务器设置
  config.static = {
    maxAge: 31536000,
    dynamic: true,
    preload: true,
    buffer: true,
    maxFiles: 10000,
  };

  //允许上传文件类型
  config.multipart = {
    fileSize:'10mb',
    whitelist: [
      // images
      '.jpg',
      '.jpeg', // image/jpeg
      '.png', // image/png, image/x-png
      '.gif', // image/gif
      '.bmp', // image/bmp
      // '.wbmp', // image/vnd.wap.wbmp
      // '.webp',
      // '.tif',
      // '.psd',
      // text
      // '.svg',
      // '.js', '.jsx',
      // '.json',
      // '.css', '.less',
      // '.html', '.htm',
      // '.xml',
      // tar
      '.zip',
      // '.gz', '.tgz', '.gzip',
      // video
      '.mp3',
      '.wma',
      '.mp4',
      '.avi',
    ]
  };

  // Node.js 性能平台监测
  // exports.alinode = {
  //   appid: '39460',
  //   secret: 'ef2f5b95a63006f545100be85c2779aedb445304',
  // };

  return config;
};
