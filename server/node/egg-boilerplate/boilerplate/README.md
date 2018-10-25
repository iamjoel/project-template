# Node.js 服务器端模板
基于 [egg](https://eggjs.org)。

### 运行
1 创建表  
在 MySQL 中创建名为 `template` 的数据库。  
执行 schma.sql 创建表结构。

2 修改配置  

* 修改 `config.default.js` 下框架相关的配置。
  * `keys` cookie 会用这个来签名，加密
  * `mysql` 的配置。
  * `jwtTokenSecret` jwt 的密钥
  * `publicApiKey` jwt 的公共api的key


3 安装依赖  
```bash
npm i
```

4 运行  
```bash
npm run debug
```

服务器端地址为 `http://localhost:7001/`。代码变化后，会自动重启。

调试项目的方法：  

1. 在地址输入: `chrome://inspect/#devices`。
1. 将 `Disvover network targets` 去设置在启动 `egg` 时，后台打出来的 `ip:端口`。
1. 点击 `Open dedicated DevTools for Node`

### 部署
```bash
$ npm start
$ npm stop
```

## 支持功能
* 对 MySQL 上数据的增删改查。
* 图片上传。本地可以了，需要放到服务器上试下，看会不会出现上传超时的问题。
* JWT。
* 接口权限。(开发中)
* 微信的相关功能。(开发中)

## 目录结构
```
egg-project
├── package.json
├── app.js 入口文件
├── app
|   ├── router.js 路由规则。
│   ├── controller 控制器。路由的处理文件。
│   ├── service 业务逻辑。读写数据库，文件等。
│   ├──── model 表的信息。如，查询时，显示表上的哪些字段。新增，更新时的字段的验证。
│   ├── middleware 中间件。
│   ├── schedule 定时任务。
│   ├── public 静态资源。图片,CSS,JS 等。
│   ├── view 模板。
│   └── extend 在内置对象上，加属性和方法。
│       ├── application.js。 访问方式 this.app。
│       ├── helper.js (可选)
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       └── agent.js (可选)
├── config
|   ├── plugin.js 插件的配置
|   ├── config.default.js
│   ├── config.prod.js 产品环境配置
|   ├── config.test.js 测试环境配置
|   ├── config.local.js 开发环境的配置
|   ├── mysql.js mysql的配置
|   ├── model-map.js model名称与对应路径的映射
└── test 测试用例。
```
    
## 说明
### 常用方法
* ctx.helper.escape : 防 SQL 注入
* require 中 '@' 指向 文件夹'app'， '@root' 指向 '项目根路径'。 用的 [module-alias](https://github.com/ilearnio/module-alias) 来实现。

### Controller
在接口处理中，Controller 层主要对用户的请求参数进行处理（校验、转换），然后调用对应的 service 方法处理业务，得到业务结果后封装并返回。

能获得的变量
* this.ctx
* this.app
* this.service
* this.config
* this.logger

## 字段验证
见 `app/service/item/model/category.js`。  

```
validFields: [{
  key: 'name',
  name: '名称',
  rule: {
    type: 'string',
    max: 5,
    min: 2
  },
  validType: 'all', //什么时候验证: add 为新增时 , edit 为编辑时, all 为新增，编辑时总是验证。默认为 all。
}]
```

### 中间件
在 `app/middleware` 中定义。加载要在使用 `config.default.js` 中配置 `config.middleware = ['xml', 'json', 中间件n...]`。

框架自带的中间件，见[这里](https://github.com/eggjs/egg/tree/master/app/middleware)。

### JWT
用 JWT 做中间件， 会把微信的回调的数据格式处理的不对。 目前配置在每个路由里的。

## Body Paser 
要调研下，以前 egg 的 Body Paser 拿文件上传的内容有问题，用 koa 的没问题。

### 内置指令
- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。

### 表设计注意点
每个表都需要有这些字段: id, delFlg, createTime, updateTime。

## TODO
* 自定义egg的脚手架。
* 错误处理。包括，如果是 `where` 里传了表里不存在的字段，给个特别的报错码。
* 微信api的接入。


### 优化项 TODO
* 加入 gzip 参考 [这里](https://eggjs.org/zh-cn/basics/middleware.html)。
* 数据库数据变动这块。探究下 Migrations 和 sequelize-cli

## 问题
* 不知如何给 `Controller` 传参。如果能给 `Controller` 传参，会传入 具体 Service 的路径，可以少些很多 `Controller`。用中间件行吗？


## 用的框架和库
* [squel](https://github.com/hiddentao/squel) 。用来拼 SQL 字符串的。

## 资源
* [Awesome Egg.js](https://github.com/eggjs/awesome-egg)