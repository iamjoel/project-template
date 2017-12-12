// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'element-ui/lib/theme-default/index.css'
import ElementUI from 'element-ui'

Vue.use(ElementUI)
Vue.config.productionTip = false


require('@/assets/utils/ajax') // axios 拦截器，做通用报错等


// import moment from 'moment'
// Vue.filter('time', function (timeStr, format = 'YYYY-MM-DD') {
//   if(!timeStr) {
//     return ''
//   }
//   return (new moment(timeStr)).format(format)
// })

// Vue.filter()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  filters: {
    
  }
})
