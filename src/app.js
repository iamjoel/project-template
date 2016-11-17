import Vue from 'vue'
import App from './App.vue'
import router from 'router'
import store from './store'
import i18n from 'vue-i18n'

require('./filters')

// ajax
import VueResource from 'vue-resource'
Vue.use(VueResource)


// 国际化
Vue.use(i18n)
import Ch from 'i18n/Ch'
import En from 'i18n/En'
Vue.locale('ch', Ch)
Vue.locale('en', En)

// 消息框
import toastr from 'toastr'
toastr.options.positionClass = 'toast-top-center';
toastr.options.preventDuplicates = true;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})