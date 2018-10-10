# 管理后台前端项目脚手架
初始化项目。如：
1. `cd 需要生成项目代码的目录`
1. `vue init 当前文件所在的路径`

## 说明
如果不做处理，`template` 目录下的所有文件做为项目的代码。`meta.js` 主要是定义模板的一些配置, 目前可定义的字段如下：
* prompts: 交互的方式获取用户的设置。`template` 下的文件可以用 Handlebars 的模板语法获得用户在这里的设置值。
* filters: 根据条件过滤文件。可以用上面 prompts 中用户设置的值。
* completeMessage: 模板渲染完成后给予的提示信息, 支持 handlebars 的 mustaches 表达式
complete: 模板渲染完成后的回调函数, 优先于 completeMessage
helpers: 自定义的 Handlebars 辅助函数。

**注意：在 template 目录中的文件中，如果生成的代码中想直接输出 `{{}}` 需要转义： `\{{}}`，否则会理解成 Handlebars 的表达式。**

## 参考
* [如何自定义自己的vue-cli模板](https://juejin.im/post/5a0d03e86fb9a044ff3102be)
* [从 vue-cli 源码学习如何写模板](https://juejin.im/entry/59781658518825594c316bab)
