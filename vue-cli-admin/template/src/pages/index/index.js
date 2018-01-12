// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router'
import 'element-ui/lib/theme-default/index.css'
import ElementUI from 'element-ui'

Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.developing = function(type = 'backend') {
  var msg = type === 'backend' ? '后端接口' : '前端' 
  ElementUI.Message({
    showClose: true,
    message: `${msg}开发中`,
    type: 'info'
  })
}

import '@/assets/utils/errorHandler'

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
