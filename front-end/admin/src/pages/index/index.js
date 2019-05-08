import Vue from 'vue'
Vue.config.productionTip = false

import App from './App'
import router from '@/router'
import { urls } from '@/setting'

Vue.use(ElementUI)
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

Vue.prototype.getDictName = function (name, key) {
  var target = this.$store.getters.dictObj[name]
  if (!target || target.length === 0) {
    return ''
  }
  var res = target.filter(item => item.key == key)[0]
  return res ? res.label : ''
}

// 原型方法
Vue.prototype.addPicUrl = urls.addPic // 上传图片地址
Vue.prototype.isDev = process.env.NODE_ENV === 'development' // 是否是开发环境
// 工具方法
import utilFns from '@/setting/base/util-fns'
utilFns.forEach(fn => {
  Vue.prototype[fn.name] = new Function(...fn.args, fn.body)
})

import '@/assets/utils/error-handler' // 错误处理,收集

import { Message } from 'element-ui'
Vue.prototype.$success = function (msg) {
  Message({
    type: 'success',
    message: msg
  })
}

Vue.prototype.$error = function (msg) {
  Message({
    type: 'error',
    message: msg
  })
}

import axios from 'axios'
require('@/service/interceptor') // axios 拦截器，做通用报错等
Vue.prototype.$http = axios

import store from '@/store'

// 过滤器
require('@/filters')

import mock from 'mockjs'
Vue.prototype.$mock = mock

var vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// 项目信息
console.group()
console.info('%c项目基本信息', 'font-size: 18px;font-weight:bold;')
console.info(
  `%c当前环境: ${process.env.NODE_ENV}`,
  'font-size: 16px;font-weight:bold;'
)
console.info('%c所有接口地址:', 'font-size: 16px;font-weight:bold;')
console.info(`
${JSON.stringify(urls, null, '\t')}
`)
console.info('%c所有路由:', 'font-size: 16px;font-weight:bold;')
import menu from '@/router/menu'
console.table(menu)
console.groupEnd()
