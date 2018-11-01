## TODO
* 图片上传，名称的优化（上传的名字+短guid）。
* 文件上传。
* 日志的完善。日志规范。 调研如何快速找到指定内容的egg的日志。看看 ELK(ElasticSearch, Logstash, Kibana)。
* API 文档的生成。 目前，没有地方定义请求体和响应体的详细信息。

### 优化项 TODO
* 加入 gzip 参考 [这里](https://eggjs.org/zh-cn/basics/middleware.html)。
* 数据库数据变动这块。探究下 Migrations 和 sequelize-cli

### 问题
* 不知如何给 `Controller` 传参。如果能给 `Controller` 传参，会传入 具体 Service 的路径，可以少些很多 `Controller`。用中间件行吗？