require('@/assets/vendor/rem')

import Vue from 'vue';

// vant ui
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
Vue.use(Vant)

// mint ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

Vue.config.productionTip = false


require('@/service/interceptor') // axios 拦截器，做通用报错等

require('@/filters')

import store from '@/store'

import router from './router'
// router.beforeEach((to, from, next) => {
  
// })

import App from './App.vue'

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
