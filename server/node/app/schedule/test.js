const Subscription = require('egg').Subscription;
var i = 0

class test extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '1s', // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
      disable:true //true 不启用 false 启用
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  * subscribe() {
    // console.log(yield this.app.mysql.query(`select * from yijia_city`))
    console.log(i++)
  }
}

module.exports = test;