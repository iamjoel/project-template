# 后台管理系统模板
用来踩框架的坑。

## 运行
1. 安装依赖
  1. 安装 Node.js, [Yarn](https://yarnpkg.com/en/docs/install)。
  1. `yarn install`
1. `npm run dev` 。项目运行起来后，浏览器会自动打开：`127.0.0.1:5000` 。

## 构建
1. `npm run build`
1. 打开 `dist` 下的 `index.html` 来查看效果。

## 做页面的步骤
第4，5步的代码可以由工具生成,点[这里](https://iamjoel.github.io/admin-fe-generator/src/)。

第1步：加路由  
打开 `src/router/menu.js`。

如果是新增的一级菜单，要加配置  
```
const MENU_PREFIXS = {
  ...
  菜单key: 一级菜单值 // 这里是新增一级菜单
}
```

加页面路由配置    
```
// 路由配置
var routes = [
  // 配一组路由：列表页，新建，更新，查看详情页。
  ...addPageGroup(页面值, 一级菜单值),
  // 加一个页面
  {
    path: 页面路径,
    component: resolve => {
      lazyLoading(resolve, '一级菜单值/页面值/list|view/:id|update/:id')
    }
  }
  
]
```

第2步：侧栏菜单加新增的页面和数据权限 
如果菜单数据和权限是调接口的，让后端改。


如果菜单数据是存在前端的，改 `src/store/actions.js` 的 `fetchMenuAndLimit` 方法：
```
menu: [...,{
  "innerid": Random.guid(),
  "name": "一级菜单名",
  "icon": 'message',
  children: [{
      "innerid": Random.guid(),
      "name": "页面名",
      path: '/xxx/xxx/list',
  },]
}],
limit: {
  'limitKey1': 值,
  ...
}
```

第3步：后台接口配置  
在 setting.js 增加。
```
接口地址Key: addUrlGroup(`${SERVER_PREFIX}/xxx`)
```

第4步：列表页。

第5步：新增，编辑，详情页。

第6步：将 list.vue,list.js, update.vue, update.js 放入文件夹： `src/一级菜单/页面值` 中。

第7步：生成接口的 mock。可以参考[mock server](https://github.com/iamjoel/mock-server)。

## 功能
* 登录页
* 登录成功后的一系列页面
  * 列表页。
  * 新建，编辑和详情页。是一个页面。

## 用的主要的框架
* [Vue](http://vuejs.org/) vue-router, vuex 等相关全家桶。
* [Element](http://element.eleme.io/#/zh-CN) 基于 Vue 的组件库。
* [axios](https://github.com/mzabriskie/axios) 用来发 HTTP 请求的。
* [PostCSS](http://postcss.org/)
  * [autoprefixer](https://github.com/postcss/autoprefixer)
* [Webpack](http://webpack.github.io/)
* [Mock.js](http://mockjs.com/) 生成随机数据，拦截 Ajax 请求。

## 工具
* [前端代码生成工具](https://github.com/iamjoel/admin-fe-generator)
* [生成接口模拟数据和文档](https://github.com/iamjoel/mock-server)
* [Sublime 的前端代码片段](https://github.com/iamjoel/util-sublime-snippent/tree/master/fe/vue)
* [vue-devtools](https://github.com/vuejs/vue-devtools)
* 生成项目框架代码 开发中...

## 本项目需要背景知识
* npm scripts 的使用。
* yarn 的使用。常用的是 `yarn install` 和 `yarn add` 。
* CommonJS 和 import 的使用。
* 框架的使用。主要是 Vue。
* 了解单页应用。

