import Vue from 'vue'
Vue.config.productionTip = false

import App from './App'
import router from '@/router'
import {urls} from '@/setting'

Vue.use(ElementUI)
import 'element-ui/lib/theme-default/index.css'
import ElementUI from 'element-ui'

Vue.prototype.getDictName = function(name, key) {
  var target = this.$store.getters.dictObj[name]
  if(!target || target.length === 0) {
    return ''
  }
  var res = target.filter(item => item.key == key)[0]
  return res ? res.label : ''
}

Vue.prototype.addPicUrl = urls.addPic // 上传图片地址

import '@/assets/utils/errorHandler' // 错误处理,收集

import axios from 'axios'
require('@/service/interceptor') // axios 拦截器，做通用报错等
Vue.prototype.$http = axios

import store from '@/store'

// 过滤器
require('@/filters')

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// 项目信息
console.group()
console.info('%c项目基本信息', 'font-size: 18px;font-weight:bold;')
console.info(`%c当前环境: ${process.env.NODE_ENV}`, 'font-size: 16px;font-weight:bold;')
console.info('%c所有接口地址:', 'font-size: 16px;font-weight:bold;')
console.info(`
${JSON.stringify(urls, null, '\t')}
`)
console.info('%c所有路由:', 'font-size: 16px;font-weight:bold;')
import menu from '@/router/menu'
console.table(menu)
console.groupEnd()
