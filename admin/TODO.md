# 待做
1 coding split优化  
https://github.com/webpack/webpack/tree/master/examples/common-chunk-and-vendor-chunk

2 详情页，在保存和下载前，数据格式的转化（如 日期字符串 <-> 日期对象 和 0，1 <-> 布尔值），有公共方法来做。


4 示例页面优化。参考 ant design 和 iview admin。

造点正常的测试数据

setting.js 放在目录中，里面放dict.js 

vue 的 keep-alive 做优化。列表页默认做 keep-alive
```
<keep-alive>
  <router-view id="main-content" v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
```


添加 npm clean 命令，做删除demo页面的功能，可参考 [react boilerplate](https://github.com/react-boilerplate/react-boilerplate)。
* views 下的一些目录
* 修改 setting 下的配置。重写 setting 比较容易。

添加 npm generate 命令，创建新的页面的功能，也参考 [react boilerplate](https://github.com/react-boilerplate/react-boilerplate)。

## 待探究
操作栏如何自适应宽度？

## 需同步到工具
* 操作栏 fixed="right"


