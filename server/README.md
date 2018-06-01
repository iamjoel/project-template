# Node.js 服务器端模板
基于 [egg](https://eggjs.org)。

### 运行
1 创建表  
在 MySQL 中创建名为 `admin-template` 的数据库。  
执行 server/schma.sql 创建表结构。

2 修改配置  
在`config` 下新建 `config.default.js` 复制 `server/config.demo.js` 的内容。
修改文件名 server/app/conf/setting.demo.js => setting.js

3 安装依赖  
```bash
npm i
```

4 运行  
```bash
npm run debug
```

服务器端地址为 `http://localhost:7001/`

### 部署
```bash
$ npm start
$ npm stop
```


### 内置指令
- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。



