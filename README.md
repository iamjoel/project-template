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

## 用的主要的框架
* [Vue](http://vuejs.org/) vue-router, vuex 等相关全家桶。
* [Element](http://element.eleme.io/#/zh-CN) 基于 Vue 的组件库。
* [axios](https://github.com/mzabriskie/axios) 用来发 HTTP 请求的。
* [PostCSS](http://postcss.org/)
  * [autoprefixer](https://github.com/postcss/autoprefixer)
* [Webpack](http://webpack.github.io/)
* [Mock.js](http://mockjs.com/) 生成随机数据，拦截 Ajax 请求。

## 工具
* [vue-devtools](https://github.com/vuejs/vue-devtools)

## 本项目需要背景知识
* npm scripts 的使用。
* yarn 的使用。常用的是 `yarn install` 和 `yarn add` 。
* CommonJS 和 import 的使用。
* 框架的使用。主要是 Vue。
* 了解单页应用。

