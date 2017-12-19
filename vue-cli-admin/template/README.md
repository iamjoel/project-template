# 后台管理系统模板

## 运行
1 生成项目代码结构：

1. `npm install -g vue-cli`
1. `vue init iamjoel/vue-cli-template-admin`


2 安装依赖：  

1. `npm install`

推荐用[Yarn](https://yarnpkg.com/en/docs/install):
1. 安装 [Yarn](https://yarnpkg.com/en/docs/install)。
1. `yarn install`。

3 在后端接口还没开发完成前:  

1. 前端用 Mock 服务器模拟接口。做法参考[这里](https://github.com/iamjoel/mock-server)。
1. 在 `config/index.js` 的 `proxyTable` 中设置 Mock 服务器的地址。
1. `npm run mock`。


4 后端接口开发好后：  

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

## 约定
* 页面： `#/一级菜单id/页面id/页面类型` 会在 `src/views` 有目录 `/一级菜单id/页面id`。
* 页面类型: list', 'detail', 'add', 'edit' 对应 列表，详情，新增和编辑页。 列表页的内容放在 list.vue 和 list.js ；详情，新增和编辑页共用 update.vue 和 update.js。

## 功能
* 登录页
* 登录成功后的一系列页面
  * 列表页。
  * 新建，编辑和详情页。是一个页面。
* 不同角色显示不同菜单。

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

## 本项目需要背景知识
* npm scripts 的使用。
* yarn 的使用。常用的是 `yarn install` 和 `yarn add` 。
* CommonJS 和 import 的使用。
* 框架的使用。主要是 Vue。
* 了解单页应用。

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
* 获取菜单


