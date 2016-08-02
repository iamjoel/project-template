var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');

Vue.use(VueRouter); // 路由
Vue.use(VueResource); // ajax这块

var router = new VueRouter({
  transitionOnLoad: true
});
router.map(require('./routes'));
router.redirect({ '*': require('setting').defaultRoute });// 默认路由

router.beforeEach(function(transition) {
  // transition.to.path;// 当前路由
  // show loading
  console.info('show loading');
  transition.next();
}).afterEach(function(transition) {
  console.info('hide loading');
});


// 多语言
var setting = require('setting');
var otherLans = setting.language.others;
otherLans.forEach(function (lan) {
  var languageData = JSON.stringify(require('json!../language/' + lan + '.json'));
  localStorage.setItem('lan-' + lan, languageData);
});

// 启动
router.start(require('../component/layout/index'), '#app');
