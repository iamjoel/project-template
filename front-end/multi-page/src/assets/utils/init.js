import Vue from 'vue'
import axios from 'axios'
import menu from '@/components/menu'
import foot from '@/components/common-foot'

export default function(App) {
  Vue.config.productionTip = false

  Vue.component('main-menu', menu)
  Vue.component('common-foot', foot)

  require('@/service/interceptor') // axios 拦截器，做通用报错等
  Vue.prototype.$http = axios

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    filters: {}
  })
}