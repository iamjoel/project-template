# Node.js 服务器端模板
基于 [egg](https://eggjs.org)。

## 运行
1 创建表  
在 MySQL 中创建名为 `template` 的数据库。  
执行 schma.sql 创建表结构。

2 修改配置  

* 修改 `config.
default.js` 下框架相关的配置。
  * `keys` cookie 会用这个来签名，加密
  * `mysql` 的配置。
  * `jwtTokenSecret` jwt 的密钥

3 安装依赖  
```bash
npm i
```

4 运行  
```bash
npm run debug
```

服务器端地址为 `http://localhost:7001/`。代码变化后，会自动重启。

## 代码调试
1. 在地址输入: `chrome://inspect/#devices`。
1. 将 `Disvover network targets` 去设置在启动 `egg` 时，后台打出来的 `ip:端口`。
1. 点击 `Open dedicated DevTools for Node`

## 测试
```
npm run test-local
```

## 部署
启动
```
$ npm start
```

停止
```
$ npm stop
```

详细文档，见[这里](https://eggjs.org/zh-cn/core/deployment.html)。

## 支持功能
* 对 MySQL 上数据的增删改查。
* 图片上传。本地可以了，需要放到服务器上试下，看会不会出现上传超时的问题。
* 文件上传。
* JWT。
* 接口权限。
* 生成某个表的增删改查的代码。 `npm run gen -- --name=表`
* 微信的相关功能(开发中)。
* 核心功能的测试(写了一小部分)。

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
│   ├── utils 工具方法
│     ├── sql sql相关的工具方法
│   └── extend 在内置对象上，加属性和方法。
│       ├── application.js。 访问方式 this.app。
│       ├── helper.js (可选)。 工具方法。
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
|   ├── acl.js 接口权限的配置
|   ├── model-map.js model名称与对应路径的映射
└── test 测试用例。
```
    
## 说明
### 常用方法
* ctx.helper.escape : 防 SQL 注入
* require 中 '@' 指向 文件夹'app'， '@root' 指向 '项目根路径'。 用的 [module-alias](https://github.com/ilearnio/module-alias) 来实现。

## 开发流程
0 数据库 表设计
每个表都需要有这些字段: `id`, `delFlg`, `createTime`, `updateTime`。删除数据只是把那条数据的 `delFlg` 设置成 1。

创建的表结构放在 `db.sql`。

1 写业务逻辑(service)。  
1\.1 在 `app/service` 下创建文件或在已有文件上添加方法，来写业务逻辑。

1\.2 在该 service 目录下，创建 model 目录，目录下放文件，来定义 获取列表，详情时，哪些字段要返回，新增，编辑时哪些字段要验证。 例如:

```
// service/item/model/item.js
module.exports = {
  viewFields: ['name', 'detail'], // 获取列表，详情时要返回的字段
  validFields: [{ // 字段验证
    key: 'name',
    name: '名称', // 
    // 验证规则
    rule: {
      type: 'string',
      max: 5,
      min: 2
    },
    validType: 'all', //什么时候验证: add 为新增时 , edit 为编辑时, all 为新增，编辑时总是验证。默认为 all。
  }, {
    key: 'detail',
    name: '详情',
    // https://github.com/node-modules/parameter
    rule: {
      type: 'string',
      max: 100,
      min: 5
    },
    validType: 'edit', // add, edit, all. default: all
  }, ]
}
```

验证规则参考 [parameter](https://github.com/node-modules/parameter)。

1\.3 在 `config/model-map.js` 中添加 model 名称和对应的文件路径。

2 写控制器(controller)
在 `app/controller` 下创建文件或在已有文件上添加方法，来写控制器。

在接口处理中，控制器主要对用户的请求参数进行处理（校验、转换），然后调用对应的 service 方法处理业务，得到业务结果后封装并返回。

能获得的变量
* this.ctx
* this.app
* this.service
* this.config
* this.logger

3 创建路由。
在 `router.js` 里创建路由。路由处理，先经过中间件，再由对应的控制器来处理。

路由创建后，需要去 `config/acl.js` 中配置各个角色对该路由的权限。写法见 [node acl](https://github.com/OptimalBits/node_acl)。任何角色(包括没有登录的)都可以访问路由以 `/publicApi` 开头。

4 写测试用例(可选)
参考 [这里](https://eggjs.org/zh-cn/core/unittest.html)

### 中间件
在 `app/middleware` 中定义。加载要在使用 `config.default.js` 中配置 `config.middleware = ['xml', 'json', 中间件n...]`。

框架自带的中间件，见[这里](https://github.com/eggjs/egg/tree/master/app/middleware)。

### JWT
用 JWT 做中间件， 会把微信的回调的数据格式处理的不对。 目前配置在每个路由里的。

## Body Paser
要调研下，以前 egg 的 Body Paser 在服务器上，拿文件上传的会有超时的问题，用 koa 的没问题。

## 用的主要的框架
* [egg](https://eggjs.org)
* 数据库相关
  * [egg-mysql](https://github.com/eggjs/egg-mysql)
  * [squel](https://github.com/hiddentao/squel) 。用来拼 SQL 字符串的。
* [node acl](https://github.com/OptimalBits/node_acl) 接口权限。
* [parameter](https://github.com/node-modules/parameter) 参数验证。
* 测试
  * [Mocha](https://mochajs.org/) 测试框架。
  * [power-assert](https://github.com/power-assert-js/power-assert) 断言库。
  * [SuperTest](https://github.com/visionmedia/supertest) 测试 HTTP 接口的断言工具库。

## 资源
* [Awesome Egg.js](https://github.com/eggjs/awesome-egg)
* [egg-init](https://github.com/eggjs/egg-init) 脚手架。

