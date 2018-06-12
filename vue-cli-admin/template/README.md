# 后台管理系统模板
配合 [管理后台代码生成工具](https://github.com/iamjoel/admin-fe-generator) 体验更佳。
## 功能
* 登录页
* 登录成功后的一系列页面
  * 列表页。
  * 新建，编辑和详情页。
* 不同角色显示不同菜单。
* Mock 后端数据。
* 开发者
  * 角色: key，描述
  * 字典。key，values 的列表。
  * 实体。通常有数据库的表与之对应。注：下拉框的数据来源来自实体或字典。
  * 导航菜单。支持2级。支持下载菜单代码。
    * 名称。
    * key。
    * 级别。顶级，二级。
    * 所属顶级。二级菜单才有改配置。
    * 选择页面。从下面的列表或详情页选或自定义。如自定义，则需配置路由和名称。
  * 列表页。根据配置来生成通用列表页。也支持根据下面的配置生成基础代码，在上面来支持一些特殊的页面。
    * 详情: 
      * 通用：id，urlKey(默认值与id相同),对应的实体的名称，描述。
      * 列表字段。每个字段包括：
        * 显示名称。
        * 后台字段。
        * 格式化函数。函数名来自函数定义。可选。
        * 是否显示函数。一般是根据角色来判断。可选。
      * 操作按钮。新增，编辑，详情，删除。
        * 某个操作按钮的显示情况可以是以下几种情况中的一种
          * 布尔值。
          * 返回布尔值的函数。
          * 显示该操作的角色数组。
        * 如果有自定义操作，则下载了基础代码上改。
      * 搜索条件。
      * 函数。函数中的 this 为 Vue 实例。
  * 新增&编辑&详情页。根据配置来生成新增&编辑&详情页。也支持根据下面的配置生成基础代码，在上面来支持一些特殊的页面。
    * 详情
      * 通用：id，urlKey(默认值与id相同)，对应的实体的名称，描述。
      * 数据：
        * 显示名称。
        * 后台字段。
        * 数据类型。
          * 字符串。默认值
          * 数字。
          * 下拉框类型。需要额外选择数据来源。字典或接口。
          * 日期。
          * 图片。
        * 验证。数组。没项目包括
          * 错误描述。
          * 验证类型
            * 非空。
            * 数字。
            * 数字范围。设置最小，最大值。
            * 自定义。设置自定义函数。
        * 获取数据后的格式化
        * 保存数据前的格式化
      * 函数。函数中的 this 为 Vue 实例。

## 运行
1 安装依赖：  

1. `npm install`

推荐用[Yarn](https://yarnpkg.com/en/docs/install):
1. 安装 [Yarn](https://yarnpkg.com/en/docs/install)。
1. `yarn install`。

2 在后端接口还没开发完成前:  

1. 前端用 Mock 服务器模拟接口。做法参考[这里](https://github.com/iamjoel/mock-server)。
1. 在 `config/index.js` 的 `proxyTable` 中设置 Mock 服务器的地址。
1. `npm run mock`。

3 后端接口开发好后：  

1. 在 `src/setting.js` 的分支 `process.env.NODE_ENV === 'development'`下设置后端地址。
1. `npm run dev`

项目运行起来后，浏览器会自动打开：`127.0.0.1:5000`。

## 构建
1. `npm run build`
1. 打开 `dist` 下的 `index.html` 来查看效果。

webpack 构建优化
1. `npm run `
1. 删除生成的 `states.json` 文件中头部乱七把糟的东西。将该文件放到 [webpack analyze](https://webpack.github.io/analyse/) 上分析。

## 做页面的步骤
第1步：配置页面 
打开 `src/setting.js`。 修改 `PAGES` 的值。配置新的页面:
```
export const PAGES = [
{ // 一级菜单
  id: 'music', 
  name: '音乐',
  children: [{ // 页面
    id: 'song',
    name: '歌曲',
    pageTypes: ['list', 'detail'], // 默认是 ['list', 'detail', 'edit'] 对应 列表(/list)，详情(/detail/:id)，新建页(/edit/-1)，编辑页(/edit/:id)。 
    pageKey: null, // 默认值为 id
    limitKey: null // 默认值为 pageKey,
    menuPath: 'detail/-1' // 菜单的入口。默认是 list
  }]
},
// ... 更多菜单和页面
]
```

第2步：制作列表页。

第3步：制作新增，编辑，详情页。

第2，3步的代码可以由工具生成,点[这里](https://iamjoel.github.io/admin-fe-generator/src/)。

第4步：将 list.vue,list.js, update.vue, update.js 放入文件夹： `src/一级菜单/页面值` 中。

第5步：生成接口的 mock。可以参考[mock server](https://github.com/iamjoel/mock-server)。

## 项目结构
```
├── build 构建流程代码
├── config 构建相关的配置
├── dist 构建过上线的代码
├── src
│   ├── assets 
│   │   └── utils 工具方法
│   ├── components 组件
│   ├── mixin 一些组件的混入
│   ├── pages 页面
│   ├── router 路由
│   ├── service 与后端的交互。公共的放这，非公共放 views/具体页面 下。
│   ├── store 全局数据
│   ├── setting.js 业务相关的配置
│   ├── dict.js 字典。如性别之类的键值对。
│   ├── filters.js 全局过滤器
│   └── views 路由对应的视图
└── static 静态资源
```

## 本项目需要背景知识
* npm scripts 的使用。
* yarn 的使用。常用的是 `yarn install` 和 `yarn add` 。
* CommonJS 和 import 的使用。
* 框架的使用。主要是 Vue。
* 了解单页应用。

## 用的主要的框架
* [Vue](http://vuejs.org/) vue-router, vuex 等相关全家桶。
* [Element](http://element.eleme.io/#/zh-CN) 基于 Vue 的组件库。
* [axios](https://github.com/mzabriskie/axios) 用来发 HTTP 请求的。
* [PostCSS](http://postcss.org/)
  * [autoprefixer](https://github.com/postcss/autoprefixer)
* [Webpack](http://webpack.github.io/)
* [Mock.js](http://mockjs.com/) 生成随机数据，拦截 Ajax 请求。
* [FunDebug](https://fundebug.com/) 全栈JavaScript错误监控工具。

## 工具
* [前端代码生成工具](https://github.com/iamjoel/admin-fe-generator)
* [生成接口模拟数据和文档](https://github.com/iamjoel/mock-server)
* [Sublime 的前端代码片段](https://github.com/iamjoel/util-sublime-snippent/tree/master/fe/vue)
* [vue-devtools](https://github.com/vuejs/vue-devtools)

## 开发约定
* `.vue` 文件必须大写。
* 页面： `#/一级菜单id/页面id/页面类型` 会在 `src/views` 有目录 `/一级菜单id/页面id`。
* 页面类型: list', 'detail', 'add', 'edit' 对应 列表，详情，新增和编辑页。 列表页的内容放在 List.vue 和 list.js ；详情，新增和编辑页共用 Update.vue 和 update.js。


## 一级菜单，页面和二级菜单页面的配置
* 通用
  * id: 唯一标识。
  * role: 角色。如果左侧菜单的数据输出不是调用接口的，通过改字段来过滤当前角色能看到的页面。
  * 一组页面。一组页面会有一个页面在左侧菜单中显示。
    * main: 左侧菜单中的页面。值是pages的type。默认值是 list(列表页)，如果没有list, 则取 pages 的第一个值。
    * name: 这组页面的名称。会显示在左侧菜单中。main 对应的页面也有 name 值，则 左侧菜单 会显示那页面。
    * ajaxKey: 这组页面 url 前缀。根据该前缀，结合 pages 的 type 在 setting.js 的 urls 上配置地址。默认值是 id。
    * limitKey: 这组页面的权限值。根据该值从权限对象中拿具体的权限值，判断有哪些权限。默认值是 id。
    * pages: 包含的页面。具体页面的配置如下
      * type 页面类型。 常见的有 'list', 'update',也可以自定义
      * filePath: 处理文件所在目录。默认值是 `src/views[/一级菜单id]/二级菜单id/${type}`。
      * routePath: 路由地址。默认值是 `[/一级菜单id]/二级菜单id/${type}`
* 一级菜单
  * children: 配置二级菜单。可选。


## 新项目需要修改的点
* ajax 地址格式 setting.js -> addUrlGroup
* 增上改查 ajax 
  * assets/utils/ajax-crud.js
  * 搜索，分页，排序写法: assets/utils/wrap-fetch-query.js
* ajax 的拦截器。处理如：接口的错误提示，登录(可能是加token),登录过期的写法 assets/utils/ajax.js

## 常见问题
Mac 上出现 `ENFILE: file table overflow`  
解决方案  
```
$ echo kern.maxfiles=65536 | sudo tee -a /etc/sysctl.conf
$ echo kern.maxfilesperproc=65536 | sudo tee -a /etc/sysctl.conf
$ sudo sysctl -w kern.maxfiles=65536
$ sudo sysctl -w kern.maxfilesperproc=65536
$ ulimit -n 65536
```

具体见 `http://blog.mact.me/2014/10/22/yosemite-upgrade-changes-open-file-limit`


