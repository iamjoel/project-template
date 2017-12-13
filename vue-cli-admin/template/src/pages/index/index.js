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
require('@/assets/utils/ajax') // axios 拦截器，做通用报错等

import store from '@/store'

// 获取资源服务器的图片
import {IMGS_PREFIX, BASIC_CONFIG} from '@/setting'
Vue.filter('img', function (value, size) {
  return `${IMGS_PREFIX}/${size === 'small' ? 'thumb_img/' : ''}${value}`
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
