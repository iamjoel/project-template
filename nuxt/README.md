# Nuxt 模板项目
## 运行
1 安装依赖：  

1. `npm install`

推荐用[Yarn](https://yarnpkg.com/en/docs/install):
1. 安装 [Yarn](https://yarnpkg.com/en/docs/install)。
1. `yarn install`。

2 启动 `npm run dev`

## 部署
```
npm run build
npm start
```

在 `package.json` 的 `config.nuxt.port` 中监听的端口。

## 文档
* [Nuxt.js](https://nuxtjs.org/)

## 常见问题
### 判断是在客户端还是服务器端
process.browser : true 在客户端; false 在服务器端

### 对于第三方组件，会用到DOM，只能在客户端渲染的处理
1 加 no-ssr 标签  
```
<no-ssr>
  <Slider animation="fade">
    <SliderItem  v-for="(i, index) in 5" :key="index">
      <img :src="'http://via.placeholder.com/200x100?text=' + i" alt="" style="width: 100%;height: 100%;" />
    </SliderItem>
  </Slider>
</no-ssr>
```

2 动态加载组件
```
components: {
  'Slider': () => new Promise(resolve => {
    import('vue-easy-slider').then(module => {
      resolve(module.Slider)
    })
  }),
  'SliderItem': () => new Promise(resolve => {
    import('vue-easy-slider').then(module => {
      resolve(module.SliderItem)
    })
  }),
}
```
