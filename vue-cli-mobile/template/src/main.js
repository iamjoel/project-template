require('@/assets/vendor/rem')

import Vue from 'vue';
Vue.config.productionTip = false

// vant ui
import Vant from 'vant';
import 'vant-css/lib/index.css';
Vue.use(Vant)

// mint ui TODO： 以后只加载 无限加载之类的 vant ui 不包含的组件。
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import axios from 'axios'
require('@/service/interceptor') // axios 拦截器，做通用报错等
Vue.prototype.$http = axios

require('@/filters')

import store from '@/store'

import router from './router'

import App from './App.vue'

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})

// 项目信息
console.group()
console.info('%c项目基本信息', 'font-size: 18px;font-weight:bold;')
console.info(`%c当前环境: ${process.env.NODE_ENV}`, 'font-size: 16px;font-weight:bold;')
console.info('%c所有接口地址:', 'font-size: 16px;font-weight:bold;')
import {urls} from '@/setting'
console.info(`
${JSON.stringify(urls, null, '\t')}
`)
console.info('%c所有路由:', 'font-size: 16px;font-weight:bold;')
import menu from '@/router/menu'
console.table(menu.map(item => {
  return {
    ...item,
    meta: JSON.stringify(item.meta)
  }
}))
console.groupEnd()
