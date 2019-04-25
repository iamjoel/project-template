module.exports = appInfo => {
  const config = {};
  config.logger = {
    dir: '/data/log/node'
  }
  // mysql 配置
  const mySqlConfig = require('./mysql.prod');
  config.mysql = {
    client: mySqlConfig,
  };

  return config;
}