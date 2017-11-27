# 后台管理系统模板
用来踩框架的坑。

## 运行
1 安装依赖  

1. 安装 Node.js, [Yarn](https://yarnpkg.com/en/docs/install)。
1. `yarn install`。

注：不想折腾Yarn，用 `npm install` 也是可以的。

2 在后端接口还没开发完成前:  

1. 前端用 Mock 服务器模拟接口。做法参考[这里](https://github.com/iamjoel/mock-server)。
1. 在 `config/index.js` 的 `proxyTable` 中设置 Mock 服务器的地址。
1. `npm run mock`。


3 后端接口开发好后  

1. 在 `src/setting.js` 的分支 `process.env.NODE_ENV === 'development'`下设置后端地址。
1. `npm run dev`

项目运行起来后，浏览器会自动打开：`127.0.0.1:5000`。

## 构建
1. `npm run build`
1. 打开 `dist` 下的 `index.html` 来查看效果。

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
    pageTypes: ['list', 'detail'], // 默认是 ['list', 'detail', , 'add', 'edit'] 对应 列表，详情，新增和编辑页。
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
* [生成项目框架代码](https://github.com/iamjoel/vue-cli-template-admin)
* [前端代码生成工具](https://github.com/iamjoel/admin-fe-generator)
* [生成接口模拟数据和文档](https://github.com/iamjoel/mock-server)
* [Sublime 的前端代码片段](https://github.com/iamjoel/util-sublime-snippent/tree/master/fe/vue)
* [vue-devtools](https://github.com/vuejs/vue-devtools)

## 本项目需要背景知识
* npm scripts 的使用。
* yarn 的使用。常用的是 `yarn install` 和 `yarn add` 。
* CommonJS 和 import 的使用。
* 框架的使用。主要是 Vue。
* 了解单页应用。

