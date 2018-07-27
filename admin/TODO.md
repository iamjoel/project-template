# 待做
* element ui 验证能支持两种类型
* 输出必要的日志信息。
* Dashboard 放常见组件的调用。参考 ant design 和 iview admin。
  * Table grid。包括分页。
  * 图片上传
  * 下拉框二级联动
  * Confirm 弹出框
  * Dialog 框
  * 错误，成功提示
  * 表单
    * 验证。要包括自定义验证。
* 造点正常的测试数据
* vue 的 keep-alive 做优化。列表页默认做 keep-alive。需要做 activated
```
<keep-alive>
  <router-view id="main-content" v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
```
* 添加 npm clean 命令，做删除demo页面的功能，可参考 [react boilerplate](https://github.com/react-boilerplate/react-boilerplate)。
  * views 下的一些目录
  * 修改 setting 下的配置。重写 setting 比较容易。

## 待探究
* 操作栏如何自适应宽度？
* coding split优化  
https://github.com/webpack/webpack/tree/master/examples/common-chunk-and-vendor-chunk
* 页面能支持不同的 layout 吗？


