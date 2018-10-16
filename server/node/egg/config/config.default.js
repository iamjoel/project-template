'use strict';

module.exports = appInfo => {
  const config = {};
  
  // 一定要配置  cookie need secret key to sign and encrypt
  config.keys = appInfo.name // package.json 里的 name

  // mysql 配置
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '',
      // 数据库名
      database: 'template',
    },
  }

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
