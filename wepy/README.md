# 微信小程序
## 常用命令
* `npm run dev` 启动。 微信开发者工具-->添加项目，项目目录请选择dist目录。

## 常见功能
### 循环
```
<repeat for="{{list}}" key="index" index="index" item="item">
  <view>{{item}}</view>
</repeat>
```

### 条件渲染

### 页面跳转
模板写法
```
<navigator url="./相对路径"></navigator>
```

js 写法
```
this.$navigate(`./相对路径`)

```

页面一定要在 `app.wpy` 的 `pages` 中注册。

### 表单元素 change 时，获得值
```
event.detail.value
```

### 组件通信

### 调用接口
```
wepy.request('xxxx').then()
```

## 一些坑
* wepy 只支持少量的 HTML 标签。
* wepy中的 `methods` 仅可用于页面事件绑定。wepy 还不支持模板中调用函数。解决方案：列表直接 map 好，详情用 computed。
* 表单元素，不支持 v-model。 需要用 value 和 @change 来自己实现实时绑定。
* 在属性中要用变量，还是要用 `{{}}`。不是 Vue 的 `:属性名` 这种写法。
* 支持小程序的生命周期：onLoad、onReady

## 文档&工具
* [WePY 文档](https://tencent.github.io/wepy/index.html)
* [小程序组件](https://mp.weixin.qq.com/debug/wxadoc/dev/component/)
* [微信小程序wepy开发资源汇总](https://github.com/aben1188/awesome-wepy)