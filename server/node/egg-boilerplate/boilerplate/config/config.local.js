module.exports = appInfo => {
  const config = {};
  
  // mysql 配置
  const mySqlConfig = require('./mysql.local');
  config.mysql = {
    client: mySqlConfig,
  };

  return config;
}