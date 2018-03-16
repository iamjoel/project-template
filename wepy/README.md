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
```
this.$navigate(`./相对路径`)
```

页面一定要在 `app.wpy` 的 `pages` 中注册。

### 组件通信

### 调用接口
```
wepy.request('xxxx').then()
```

## 一些坑
* wepy中的methods仅可用于页面事件绑定，其他自定义方法都要放在外层，而VUE中所有方法均放在 methods下。wepy 还不支持模板中调用函数。解决方案：列表直接 map 好，详情用 computed。
* 支持小程序的生命周期：onLoad、onReady

## 文档&工具
* [WePY 文档](https://tencent.github.io/wepy/index.html)
* [小程序组件](https://mp.weixin.qq.com/debug/wxadoc/dev/component/)
* [微信小程序wepy开发资源汇总](https://github.com/aben1188/awesome-wepy)