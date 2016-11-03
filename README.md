# 娱乐空间
## 运行
1. `npm i`
1. `npm run dev`
1. 在浏览器中输入地址 `127.0.0.1:5000`

## 构建
`npm run build`。在打开 `dist` 下的 `index.html` 看效果。

## 用的主要的框架
* [Vue](http://vuejs.org/) 2.0
    * [vue-router](https://github.com/vuejs/vue-router) [doc](http://router.vuejs.org/zh-cn/index.html)
    * [vuex](https://github.com/vuejs/vuex) [doc](http://vuex.vuejs.org/en/index.html) 目前 [vue-devtools](https://github.com/vuejs/vue-devtools) 还支持 Vue 2。
    * [vue-resource](https://github.com/vuejs/vue-resource) [doc](https://github.com/vuejs/vue-resource/tree/master/docs)
* [Bootstrap](http://getbootstrap.com/) 3
* [PostCSS](http://postcss.org/)
  * [autoprefixer](https://github.com/postcss/autoprefixer)
  * [precss](https://github.com/jonathantneal/precss)
* [Webpack](http://webpack.github.io/)
    * [vue-loader](http://vue-loader.vuejs.org/en/index.html)
    * [HTML Webpack Plugin](https://github.com/ampedandwired/html-webpack-plugin) 生成HTML。[HTML Webpack Template](https://github.com/jaketrent/html-webpack-template#html-webpack-template)
    * [extract text plugin for webpack](https://github.com/webpack/extract-text-webpack-plugin/blob/webpack-1/README.md) 将 Style 变成 独立成 link 标签。
* [Mock.js](http://mockjs.com/) 生成随机数据，拦截 Ajax 请求。
* UI
  * [toastr](https://github.com/CodeSeven/toastr) 显示提示消息
  * [select2](https://github.com/select2/select2) 下拉框



## 参考
* [Vue Admin](https://github.com/fundon/vue-admin)
* [vue-smart-table](https://github.com/gurghet/vue-smart-table)
* [Awesome Vue.js](https://github.com/vuejs/awesome-vue)
* [vue-strap](https://github.com/yuche/vue-strap)