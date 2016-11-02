import Vue from 'vue'
import App from './App.vue'
import router from 'router'
import store from './store'

// ajax
import VueResource from 'vue-resource'
Vue.use(VueResource)

// 国际化 目前还有问题
// import i18n from 'plugin/i18n'
// Vue.use(i18n)
import toastr from 'toastr'
toastr.options.positionClass = 'toast-top-center';
toastr.options.preventDuplicates = true;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})