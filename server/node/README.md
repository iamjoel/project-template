# Node.js 服务器端模板
基于 [egg](https://eggjs.org)。

### 运行
1 创建表  
在 MySQL 中创建名为 `template` 的数据库。  
执行 schma.sql 创建表结构。

2 修改配置  

* 修改 `config.default.js` 下框架相关的配置。如 `mysql` 的配置。
* 修改 `server/app/conf/setting.js` 下业务逻辑的配置。

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
* 微信的相关功能
* 短信
* JWT

## 目录结构
```
egg-project
├── package.json
├── app.js 入口文件
├── app
|   ├── router.js 路由规则。
│   ├── controller 控制器。路由的处理文件。
│   ├── service 业务逻辑。读写数据库，文件等。
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
└── test 测试用例。
```
    
## 说明
### Controller
在接口处理中，Controller 层主要对用户的请求参数进行处理（校验、转换），然后调用对应的 service 方法处理业务，得到业务结果后封装并返回。

能获得的变量
* this.ctx
* this.app
* this.service
* this.config
* this.logger

### 中间件
在 `app/middleware` 中定义。加载要在使用 `config.default.js` 中配置 `config.middleware = ['xml', 'json', 中间件n...]`。

框架自带的中间件，见[这里](https://github.com/eggjs/egg/tree/master/app/middleware)。

### JWT
用 JWT 做中间件， 会把微信的回调的数据格式处理的不对。 目前配置在每个路由里的。

### 内置指令
- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。

## TODO
* 将 `app/config` 合并到 `config` 下。
* 将 `service/commonLogic` 下的做成一个个的 npm 的包。
* 将 `service/businessLogic` 文件夹 和 `speccialLogic.js` 去掉。验证放到 controller 里去做。
* 加入 gzip 参考 [这里](https://eggjs.org/zh-cn/basics/middleware.html)。
