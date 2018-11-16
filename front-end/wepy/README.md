# WePY
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
不支持 v-if, v-show。可以类名的方式实现 `v-show` 的效果。如
```
<view class="{{!isShow ? 'd-n' : ''}}"></view
```

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
子组件向父组件传信息
```
this.$emit(eventName, data)

```

父组件处理信息
```
<Child @eventName.user="handleFn"/>
```

页面调用组件的方法  
$invoke是一个页面或组件对另一个组件中的方法的直接调用，通过传入组件路径找到相应的组件，然后再调用其方法。
```
this.$invoke('ComA', 'someMethod', 'someArgs')
```


父组件向子组件发信息
```
this.$broadcast(eventName, data)
```

### 调用接口
```
wepy.request('xxxx').then()
```

注意：
* 请求的域名需要添加到合法域名列表中。
* 线上小程序的接口请求必须是 `https`。

## 一些坑
* 微信小程序 只支持少量的 HTML 标签。不支持 div, span。如果用div，会把 div 处理为内联元素。用 block 元素来代替 div。
* 不支持 window 对象。
* 样式表不支持级联选择器。
* 一个应用同时只能打开5个页面。当已经打开了5个页面之后，wx.navigateTo不能正常打开新页面。请避免多层级的交互方式，或者使用wx.redirectTo。
* wepy中的 `methods` 仅可用于页面事件绑定。wepy 还不支持模板中调用函数。解决方案：列表直接 map 好，详情用 computed。
* 表单元素，不支持 v-model。 需要用 value 和 @change 来自己实现实时绑定。
* 在属性中要用变量，还是要用 `{{}}`。不是 Vue 的 `:属性名` 这种写法。
* 调用接口
  * 调用接口时，接口必须，在后台设置中，将请求的域名添加到合法域名列表中。否则会报错： `xxx 不在以下 request 合法域名列表中`。
  * 线上小程序的接口请求必须是 `https`。
* 支持小程序的生命周期：onLoad、onReady

## 文档&工具
* [WePY 文档](https://tencent.github.io/wepy/index.html)
* [小程序组件](https://mp.weixin.qq.com/debug/wxadoc/dev/component/)
* [小程序API](https://mp.weixin.qq.com/debug/wxadoc/dev/api/)
* [小程序插件](https://mp.weixin.qq.com/debug/wxadoc/introduction/plugin.html)
* [微信小程序wepy开发资源汇总](https://github.com/aben1188/awesome-wepy)
* [微信小程序免费SSL证书Https 申请（阿里云申请）](https://www.cnblogs.com/jianxuanbing/p/8205042.html)

## 其他
* 微信开发者工具中
  * 点预览可以生成二维码，在真机上看效果。
  * 点上传可以上传代码。然后需要登录后台提交审核。 