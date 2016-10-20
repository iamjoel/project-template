var Vue = require('vue')
var VueResource = require('vue-resource')

Vue.use(VueResource) // ajax这块

// 多语言
var setting = require('setting')
var otherLans = setting.language.others
otherLans.forEach(function (lan) {
  var languageData = JSON.stringify(require('json!./language/' + lan + '.json'))
  localStorage.setItem('lan-' + lan, languageData)
})

var Main = require('component/layout/main')
// 启动
const app = (new Main()).$mount('#app')
