import Vue from 'vue'
import Router from 'vue-router'
import menu from './menu'

Vue.use(Router)

export default new Router({
  routes: [
    ...menu,
    // 出错的默认地址
    {
      path: '*',
      redirect: '/'
    }
  ]
})
