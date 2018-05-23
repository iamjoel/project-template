# 移动端模板
## 运行
1 安装依赖：  

1. `npm install`

推荐用[Yarn](https://yarnpkg.com/en/docs/install):
1. 安装 [Yarn](https://yarnpkg.com/en/docs/install)。
1. `yarn install`。

2 启动 `npm run dev`

## 构建
1. `npm run build`
1. 打开 `dist` 下的 `index.html` 来查看效果。

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

## 路由配置
```
{
  path: 路由,
  meta: {
    title: 页面标题, 
    isShowFooter: false, // 是否显示底部的Tab。默认值是true
    activeTypeIndex: 1, // 需要高亮的底部Tab的下标。首页，分类，购物车，我的 对应 0，1，2，3
  },
  component: resolve => {
    lazyLoading(resolve, 在views下的木)
  },
}
```

## 约定
1 页面中的 `style` 默认要加 `scoped` 的属性。如
```
<style scoped>
.img {
  display: block;
  width: 3rem;
}
</style>
```

在当前页面重置第三方组件样式时，可以不加 `scoped`。需要在带去页面加唯一的类名。如:  

```
<template>
<div class="main some-page">
  <el-menu>...</el-menu>
</div>
</template>

<style>
.some-page .el-menu {
  border-radius: 0;
}
</style>
```

2 为每个页面建立一个目录。文件包括:
* `Index.vue` 
* `style.css` 可选。
* `main.js` 可选。
* `image/` 可选。放图片。

## 用的主要的框架
* [Vue](http://vuejs.org/) vue-router, vuex 等相关全家桶。
* [Vant UI](https://www.youzanyun.com/zanui/vant#/zh-CN/component/intro) 有赞出品的基于 Vue 的组件库。